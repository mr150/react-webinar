import StoreModule from "../module";

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

  async load(){
    const response = await fetch('/api/v1/articles?fields=items(*),count');
    const json = await response.json();
    this.setState({
      ...json.result
    });
  }

  async toPage(n, limit = 10){
    const response = await fetch(`/api/v1/articles?skip=${n * limit}&limit=` + limit);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      ...json.result,
      curPage: n,
    });
  }
}

export default CatalogStore;
