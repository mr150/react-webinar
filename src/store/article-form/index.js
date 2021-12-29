import StoreModule from "../module";
import {getFormData} from '../../utils/get-form-data';

function fillRequestErrors(data) {
  return {
    success: false,
    errors: data.reduce((result, item) => {
      result[item.path] = item.message;
      return result;
    }, {}),
  };
}

class ArticleFormStore extends StoreModule {
  initState() {
    return {
      requestResult: {
        errors: {},
      },
      pageTitle: '',
      data: {},
      waiting: true
    };
  }

  reset(waiting = true) {
    this.updateState({...this.initState(), waiting});
  }

  async load(id){
    this.reset();
    const articleState = this.store.article.getState();

    if(articleState.data._id === id) {
      this.updateState({
        waiting: false,
        pageTitle: articleState.data.title,
        data: articleState.data
      });
    } else {
      await this.store.article.load.call(this, id);
    }
  }

  async edit(form){
    const formData = getFormData(form),
          oldTitle = this.getState().pageTitle;
    formData._id = this.getState().data._id;
    this.reset();

    const response = await fetch('/api/v1/articles/' + formData._id, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const json = await response.json();

    const newState = {
      waiting: false,
      data: formData,
      pageTitle: oldTitle,
      requestResult: {success: true},
    };

    if(json.error !== undefined) {
      newState.requestResult = fillRequestErrors(json.error.data.issues);
    } else {
      newState.pageTitle = formData.title;
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

    const newState = {
      waiting: false,
      data: formData,
      requestResult: {success: true},
    };

    if(json.error !== undefined) {
      newState.requestResult = fillRequestErrors(json.error.data.issues);
    } else {
      newState.data = json.result;
      newState.pageTitle = formData.title;
    }

    this.updateState(newState);
  }
}

export default ArticleFormStore;
