import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class CategoriesStore extends StoreModule {

  initState() {
    return {
      items: [],
    };
  }

  async load(isFilter){
    const items = [];

    if(isFilter) {
      items.push({value: '', title: 'Все'});
      this.updateState({
        items,
      });
    }

    const {result} = (await apiGet('categories', {limit: '*', fields: '_id,parent,title'}));

    this.updateState({
      items: items.concat(
        result.items.map(item => ({value: item._id, title: item.title}))
      ),
    });
  }
}

export default CategoriesStore;
