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

      this.updateState({
        items: items.concat(
          result.items.map(item => ({value: item._id, title: item.title}))
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
