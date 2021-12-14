import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class CatalogStore extends StoreModule {
  static productPlaceholder = {
    title: '...',
    description: '...',
    price: 0
  };

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
      curPage: 0,
      curProduct: CatalogStore.productPlaceholder,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(){
    const {result} = (await apiGet('articles', {fields: 'items(*),count'}));

    this.setState({
      ...this.getState(),
      ...result
    });
  }

  /**
   * Переход на страницу по пагинации
   */
  async toPage(n, limit = 10){
    const {result} = (await apiGet('articles', {skip: n * limit, limit}));

    this.setState({
      ...this.getState(),
      ...result,
      curPage: n,
    });
  }

  async loadProduct(id){
    const state = this.getState();

    this.setState({
      ...state,
      curProduct: CatalogStore.productPlaceholder,
    });

    const {result} = (
      await apiGet('articles/' + id, {fields: '*,maidIn(title,code),category(title)'})
    );

    if(state.items.find(item => item._id === result._id) === undefined)
      state.items.push(result);

    this.setState({
      ...state,
      curProduct: result,
    });
  }
}

export default CatalogStore;
