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
      curProduct: {},
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
    const {result} = (await apiGet('articles/' + id, {fields: '*,maidIn(title,code),category(title)'})),
          state = this.getState();

    if(state.items.find(item => item._id === result._id) === undefined)
      state.items.push(result);

    this.setState({
      ...state,
      curProduct: result,
    });
  }
}

export default CatalogStore;
