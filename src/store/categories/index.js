import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class CategoriesStore extends StoreModule {

  initState() {
    return {
      items: [],
      waiting: false,
    };
  }

  async load(isFilter){
    this.updateState({
      waiting: true,
    });

    const {items} = this.getState(),
          isEmpty = !items.length;

    if(isFilter && !(items[0]?.value === '')) {
      items.unshift({value: '', title: 'Все'});
    } else if(items[0]?.value === '') {
      items.shift();
    }

    if(isEmpty) {
      const {result} = (await apiGet('categories', {limit: '*', fields: '_id,parent,title'}));

      // В алгоритмах я пока слабоват, но постарался сделать минимальную сложность, какую смог
      const ctgMap = result.items.reduce((map, item) => {
        map[item._id] = {
          title: item.title,
          parent: item.parent === null ? undefined : item.parent._id,
        };

        return map;
      }, {});

      const sorted = [];

      result.items.forEach(item => {
        let parentId = item.parent && item.parent._id,
            lvl = 0;

        while(parentId) {
          parentId = ctgMap[parentId].parent;
          lvl++;
        }

        if(lvl) {
          item.title = '-'.repeat(lvl) + ' ' + item.title;
        }

        let parentIndex = sorted.findIndex(
          parent => parent._id === (item.parent && item.parent._id)
        );

        if(parentIndex < 0) parentIndex = sorted.length;
        else parentIndex++;

        sorted.splice(parentIndex, 0, item);
      });

      this.updateState({
        items: items.concat(
          sorted.map(item => ({value: item._id, title: item.title}))
        ),
        waiting: false
      });
    } else {
      this.updateState({
        items: items.slice(),
        waiting: false
      });
    }
  }
}

export default CategoriesStore;
