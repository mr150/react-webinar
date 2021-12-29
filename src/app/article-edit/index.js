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
    if(creation) await store.articleForm.reset(false, 'Новый товар');
    else await store.articleForm.load(params.id);

    await store.categories.load();
    await store.countries.load();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.articleForm.data,
    title: state.articleForm.pageTitle,
    waiting: state.articleForm.waiting || state.countries.waiting,
  }));

  const callbacks = {
    submit: useCallback(
      (creation ? () => store.articleForm.create() : () => store.articleForm.edit()),
      [select.article]
    ),
  };

  return (
    <Layout head={<h1>{select.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleForm article={select.article} onSubmit={callbacks.submit}/>
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
