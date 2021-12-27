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

  async edit(form){
    this.updateState({
      requestResult: {},
      waiting: true,
    });

    const formData = {};
    new FormData(form).forEach((value, key) => formData[key] = value);
    formData._id = this.getState().data._id;
    formData.price = +formData.price;
    formData.edition = +formData.edition;
    formData.maidIn = {_id: formData.maidIn};
    formData.category = {_id: formData.category};

    const response = await fetch('/api/v1/articles/' + formData._id, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const json = await response.json();

    const requestResult = {success: true, msg: 'Изменения сохранены'};
    const newState = {
      waiting: false,
      requestResult
    };

    if(json.error !== undefined) {
      requestResult.success = false;
      requestResult.msg = json.error.message;
      requestResult.code = json.error.code;
    } else {
      newState.data = formData;
    }

    this.updateState(newState);
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
