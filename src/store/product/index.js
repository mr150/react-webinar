import StoreModule from '../module';
import {apiGet} from '../../utils/api';

class ProductStore extends StoreModule {
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
      current: ProductStore.productPlaceholder
    }
  }

  async load(id){
    const products = this.store.getState().catalog.items,
          state = this.getState();

    this.setState({
      ...state,
      current: ProductStore.productPlaceholder,
    });

    const {result} = (
      await apiGet('articles/' + id, {fields: '*,maidIn(title,code),category(title)'})
    );

    if(products.find(item => item._id === result._id) === undefined)
      products.push(result);

    this.setState({
      ...state,
      current: result,
    });
  }
}

export default ProductStore;
