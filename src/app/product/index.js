import React, {useCallback, useEffect} from 'react';
import Layout from '../../components/layout';
import TopPanel from '../../components/top-panel';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import {useParams} from 'react-router-dom';
import numberFormat from '../../utils/number-format';
import './styles.css';

function Product() {
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
      <div className='Product'>
        <p>{data.description}</p>
        <p>Страна производитель: <b>{data.maidIn?.title} ({data.maidIn?.code})</b></p>
        <p>Категория: <b>{data.category?.title}</b></p>
        <p>Год выпуска: <b>{data.edition}</b></p>
        <strong className='Product__price'>{numberFormat(data.price)} ₽</strong>
        <button onClick={() => callbacks.addToBasket(data._id)}>Добавить</button>
      </div>
    </Layout>
  );
}

export default React.memo(Product);
