import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import ArticleForm from "../../containers/article-form";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";

function ArticleEdit() {

  const store = useStore();
  const params = useParams();

  useInit(async () => {
    await store.article.load(params.id, true);
    await store.categories.load();
    await store.articleForm.loadCountries();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.articleForm.waiting,
  }));

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    saveChanges: useCallback((e) => {
      e.preventDefault();
      store.articleForm.edit(e.target);
    }, [select.article]),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleForm article={select.article} onSubmit={callbacks.saveChanges}/> :
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
