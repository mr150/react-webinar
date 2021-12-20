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
  async load(n = 0, limit = 10, fields = 'items(*)') {
    const {result} = (await apiGet('articles', {skip: n * limit, limit, fields}));

    this.setState({
      ...this.getState(),
      ...result,
      curPage: n,
    });
  }
}

export default CatalogStore;
