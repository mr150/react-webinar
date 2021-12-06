class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Подписчики на изменение state
    this.listners = [];
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Выбор state
   * @return {*}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {*}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister(this.state);
    }
  }

  // Действия приложения.
  // @todo
  // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
  // Может быть как модуль (расширение) для Store

  /**
   * Создание записи
   */
  createItem() {
    const code = Math.max(0, ...this.state.items.map(item => item.code)) + 1;
    this.setState({
      items: this.state.items.concat({
        code,
        selectCount: 0,
        title: 'Новая запись №'+code
      })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Добавление товара в корзину
   * @param curItem
   */
  addToCart(curItem) {
    let products = this.state.cart.items;
    const indexInCart = products.findIndex(item => item.code === curItem.code);

    if(indexInCart === -1) {
      products = products.concat(
        {
          ...curItem,
          amount: 1,
        }
      );
    } else {
      products = products.map(
        (item, i) => i === indexInCart ? {...item, amount: item.amount + 1} : item
      );
    }

    this.setState({
      items: this.state.items,
      cart: {
        sumPrice: this.state.cart.sumPrice + curItem.price,
        sumCount: this.state.cart.sumCount + 1,
        items: products,
      }
    });
  }

  /**
   * Открыть/закрыть модалку
   * @param curItem
   */
  toggleModal(openModal) {
    this.setState({
      items: this.state.items,
      cart: this.state.cart,
      openModal
    });
  }
}

export default Store;
