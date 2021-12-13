import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
      curPage: 0,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(){
    const json = await apiGet('articles', {fields: 'items(*),count'});

    this.setState({
      ...json.result
    });
  }

  /**
   * Переход на страницу по пагинации
   */
  async toPage(n, limit = 10){
    const json = await apiGet('articles', {skip: n * limit, limit});

    this.setState({
      ...this.getState(),
      ...json.result,
      curPage: n,
    });
  }
}

export default CatalogStore;
