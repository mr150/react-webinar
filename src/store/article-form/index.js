import StoreModule from "../module";
import {getFormData} from '../../utils/get-form-data';

class ArticleFormStore extends StoreModule {
  initState() {
    return {
      requestResult: {},
      data: {
        title: 'Новый товар'
      },
      waiting: true
    };
  }

  reset(waiting = true) {
    this.updateState({...this.initState(), waiting});
  }

  async edit(form){
    this.reset();

    const articleState = this.store.article.getState();
    const formData = getFormData(form);
    formData._id = articleState.data._id;

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

  async create(form){
    this.reset();

    const formData = getFormData(form);
    formData.name = formData.title;

    const response = await fetch('/api/v1/articles', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const json = await response.json();

    const requestResult = {success: true};
    const newState = {
      waiting: false,
      data: formData,
      requestResult
    };

    if(json.error !== undefined) {
      requestResult.success = false;
      requestResult.errors = json.error.data.issues;
    } else {
      newState.data = json.result;
    }

    this.updateState(newState);
  }
}

export default ArticleFormStore;
