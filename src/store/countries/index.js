import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class CountriesStore extends StoreModule {

  initState() {
    return {
      items: [],
    };
  }

  async load(){
    this.updateState({
      waiting: true,
    });

    const {result} = (await apiGet('countries', {limit: '*', fields: 'title,_id'}));

    this.updateState({
      items: result.items
        .map(item => ({value: item._id, title: item.title}))
        .sort((a, b) => (a.title > b.title) ? 1 : -1),
      waiting: false
    });
  }
}

export default CountriesStore;
