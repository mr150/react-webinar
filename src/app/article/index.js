import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams, useSearchParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import ArticleForm from "../../containers/article-form";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";

function Article() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Начальная загрузка
  useInit(async () => {
    await store.get('article').load(params.id);
    await store.categories.load();
    await store.get('article').loadCountries();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>

      <Header/>

      <Spinner active={select.waiting}>
      {
        searchParams.has('edit') ?
          <ArticleForm article={select.article} onSave={callbacks.saveChanges}/> :
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket}/>
      }
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
