import StoreModule from "../module";
import {convertFormData} from '../../utils/convert-form-data';

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

  reset(waiting = true, pageTitle = '') {
    this.updateState({...this.initState(), waiting, pageTitle});
  }

  setInputValue(name, value, isSelect) {
    this.updateState({
      data: {...this.getState().data, [name]: isSelect ? {_id: value} : value.target.value}
    });
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

  async edit(){
    const formData = convertFormData(this.getState().data),
          oldTitle = this.getState().pageTitle;

    this.updateState({
      waiting: true, requestResult: {}
    });

    const response = await fetch('/api/v1/articles/' + formData._id, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const json = await response.json();

    const newState = {
      waiting: false,
      pageTitle: oldTitle,
      requestResult: {success: true},
    };

    if(json.error !== undefined) {
      newState.requestResult = fillRequestErrors(json.error.data.issues);
    } else {
      newState.pageTitle = json.result.title;
    }

    this.updateState(newState);
  }

  async create(){
    this.updateState({
      waiting: true,
      requestResult: {},
    });

    const formData = convertFormData(this.getState().data);
    formData.name = formData.title;

    // Возможно такое стоило делать при инициализации, но я торопился
    if(formData.category === undefined) {
      formData.category = {_id: this.store.categories.getState().items[0].value}
    }

    if(formData.country === undefined) {
      formData.country = {_id: this.store.countries.getState().items[0].value}
    }

    if(formData._id !== undefined) delete formData._id;

    const response = await fetch('/api/v1/articles', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const json = await response.json();

    const newState = {
      waiting: false,
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
