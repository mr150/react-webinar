import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class CategoriesStore extends StoreModule {

  initState() {
    return {
      items: [],
    };
  }

  async load(isFilter){
    const {items} = this.getState(),
          isEmpty = !items.length;

    if(isFilter && !(items[0]?.value === '')) {
      items.unshift({value: '', title: 'Все'});
    } else {
      items.shift();
    }

    if(isEmpty) {
      const {result} = (await apiGet('categories', {limit: '*', fields: '_id,parent,title'}));

      // Понимаю, что это плохое решение для сортировки. Пробовал найти более простое или рекурсивное, но до чего то получше не додумался
      const ctgMap = result.items.reduce((map, item) => {
        map[item._id] = {
          title: item.title,
          parent: item.parent === null ? undefined : item.parent._id,
        };

        return map;
      }, {});

      let maxLvl = 0;

      result.items.forEach(item => {
        let parent = item.parent && item.parent._id,
            lvl = 0;

        while(parent) {
          parent = ctgMap[parent].parent;
          lvl++;
        }

        if(lvl) {
          if(lvl > maxLvl) maxLvl = lvl;
          item.lvl = lvl;
          if(isFilter) item.title = '-'.repeat(lvl) + ' ' + item.title;
        }
      });

      const tree = [];

      for(let i = 0; i < maxLvl + 1; i++) {
        tree.push([]);
      }

      result.items.forEach(item => {
        tree[item.lvl || 0].push(item);
      })

      const sorted = tree.shift();

      tree.forEach(arr => {
        arr.forEach(item => {
          let parentIndex = sorted.findIndex(parent => parent._id === item.parent._id);
          if(parentIndex < 0) parentIndex = sorted.length - 1;
          sorted.splice(parentIndex + 1, 0, item);
        });
      });

      this.updateState({
        items: items.concat(
          sorted.map(item => ({value: item._id, title: item.title}))
        ),
      });
    } else {
      this.updateState({
        items: items.slice(),
      });
    }
  }
}

export default CategoriesStore;
