import React, {useCallback} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import Cart from './components/cart';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const state = store.getState();

  const callbacks = {
    onOpenCart: useCallback(() => store.toggleModal(true), [store]),
    onAddToCart: useCallback((item) => store.addToCart(item), [store]),
    onCloseModal: useCallback(() => store.toggleModal(false), [store]),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls cart={state.cart} onOpenCart={callbacks.onOpenCart}/>
        <List items={state.items}
              onAddToCart={callbacks.onAddToCart}/>
      </Layout>
      <Modal title='Корзина' onClose={callbacks.onCloseModal} hidden={!state.openModal}>
        <Cart className='Modal__spacer' items={state.cart}/>
      </Modal>
    </>
  );
}

export default App;
