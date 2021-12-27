import StoreModule from "../module";
import {apiGet} from '../../utils/api';

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      requestResult: {},
      countries: [],
      waiting: true
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id){

    this.updateState({
      waiting: true,
      requestResult: {},
      data: {}
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        waiting: false
      });

    } catch (e){
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

  async loadCountries(){
    this.updateState({
      waiting: true,
    });

    const {result} = (await apiGet('countries', {limit: '*', fields: 'title,_id'}));

    this.updateState({
      countries: result.items
        .map(item => ({value: item._id, title: item.title}))
        .sort((a, b) => (a.title > b.title) ? 1 : -1),
      waiting: false
    });
  }
}

export default ArticleStore;
