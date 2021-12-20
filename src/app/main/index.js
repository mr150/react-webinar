import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import TopPanel from '../../components/top-panel';
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    curPage: state.catalog.curPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(select.curPage, 10, 'items(*),count');
  }, []);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    toCatalogPage: useCallback(async (i) => {
      await store.catalog.load(i);
    }, [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <TopPanel onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination className='Layout__paginator' count={select.count} active={select.curPage} onGo={callbacks.toCatalogPage}/>
    </Layout>
  );
}

export default React.memo(Main);
