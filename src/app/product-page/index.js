import React, {useCallback, useEffect} from 'react';
import Layout from '../../components/layout';
import TopPanel from '../../components/top-panel';
import Product from '../../components/product';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import {useParams} from 'react-router-dom';

function ProductPage() {
  const select = useSelector(state => ({
    product: state.catalog.curProduct,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const store = useStore(),
        params = useParams(),
        data = select.product;

  useEffect(async () => {
    await store.catalog.loadProduct(params.id);
  }, [params.id]);

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  };

  return (
    <Layout head={<h1>{data.title}</h1>}>
      <TopPanel onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
      <Product onAdd={callbacks.addToBasket} data={data}/>
    </Layout>
  );
}

export default React.memo(ProductPage);
