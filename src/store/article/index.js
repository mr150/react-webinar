import StoreModule from "../module";
import {apiGet} from '../../utils/api';

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      waiting: true
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id){

    this.updateState({
      waiting: true,
      data: {}
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        pageTitle: json.result.title,
        waiting: false
      });

    } catch (e){
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

  async deleteItem(){
    this.updateState({
      waiting: true,
    });

    await fetch('/api/v1/articles/' + this.getState().data._id, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
    });

    this.updateState({
      data: {},
      waiting: false,
    });
  }
}

export default ArticleStore;
