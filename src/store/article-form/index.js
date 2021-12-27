import StoreModule from "../module";
import {apiGet} from '../../utils/api';

class ArticleFormStore extends StoreModule {
  initState() {
    return {
      requestResult: {},
      countries: [],
      waiting: true
    };
  }

  async edit(form){
    this.updateState({
      requestResult: {},
      waiting: true,
    });

    const articleState = this.store.article.getState();
    const formData = {};
    new FormData(form).forEach((value, key) => formData[key] = value);
    formData._id = articleState.data._id;
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

    const requestResult = {success: true};
    const newState = {
      waiting: false,
      requestResult
    };

    if(json.error !== undefined) {
      requestResult.success = false;
      requestResult.errors = json.error.data.issues;
    } else {
      articleState.data = formData;
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

export default ArticleFormStore;
