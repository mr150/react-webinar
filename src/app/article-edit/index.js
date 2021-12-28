import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import ArticleForm from "../../containers/article-form";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";

function ArticleEdit({creation}) {

  const store = useStore();
  const params = useParams();

  useInit(async () => {
    if(!creation) await store.article.load(params.id);
    await store.categories.load();
    await store.countries.load();
  }, [params.id, creation]);

  useInit(() => {
    store.articleForm.reset(!creation);
  }, [params.id]);

  const select = useSelector(state => (creation ? {
    article: state.articleForm.data,
    waiting: state.articleForm.waiting || state.countries.waiting,
  } : {
    article: state.article.data,
    waiting: state.article.waiting || state.countries.waiting,
  }));

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    submit: useCallback((e) => {
      e.preventDefault();
      if(creation) store.articleForm.create(e.target);
      else store.articleForm.edit(e.target);
    }, [select.article, creation]),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleForm article={select.article} onSubmit={callbacks.submit}/>
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
