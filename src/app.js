import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const state = store.getState();

  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onAddToCart: useCallback((code) => store.addToCart(code), [state.cart]),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={state.cart} onCreate={callbacks.onCreateItem}/>
      <List items={state.items}
            onAddToCart={callbacks.onAddToCart}/>
    </Layout>
  );
}

export default App;
