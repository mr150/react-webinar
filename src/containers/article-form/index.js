import React, {useState, useCallback} from 'react';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname';
import {Link} from "react-router-dom";
import Input from "../../components/input";
import Select from "../../components/select";
import Field from "../../components/field";
import './styles.css';

function ArticleForm({article, onSubmit}) {

  // CSS классы по БЭМ
  const className = cn('ArticleForm');
  const store = useStore();

  const select = useSelector(state => ({
    countries: state.countries.items,
    categories: state.categories.items,
    result: state.articleForm.requestResult,
  }));

  const onChangeHandler = useCallback((name, isSelect) => {
    return (e) => store.articleForm.setInputValue(name, e, isSelect);
  }, [article]);
  const {errors = {}} = select.result;

  return (
    <form className={className()} onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
      {article._id && <Link to={'/articles/' + article._id}>Просмотр</Link>}
      <Field label="Название" message={errors["title.'ru'"]}>
        <Input name="title" defaultValue={article.title} onChange={onChangeHandler('title')}/>
      </Field>

      <Field label="Описание" message={errors.description}>
        <Input tagName="textarea" theme="area" name="description" defaultValue={article.description} onChange={onChangeHandler('description')}/>
      </Field>

      <Field label="Страна производитель" message={errors.maidIn}>
        <Select name="maidIn" value={article.maidIn?._id} options={select.countries} onChange={onChangeHandler('maidIn', true)}/>
      </Field>

      <Field label="Категория" message={errors.category}>
        <Select name="category" value={article.category?._id} onChange={onChangeHandler('category', true)} options={select.categories}/>
      </Field>

      <Field label="Год выпуска" message={errors.edition}>
        <Input type="number" name="edition" onChange={onChangeHandler('edition')} defaultValue={article.edition}/>
      </Field>

      <Field label="Цена (₽)" message={errors.price}>
        <Input type="number" name="price" onChange={onChangeHandler('price')} defaultValue={article.price}/>
      </Field>

      <button>Сохранить</button>
      { // уведомление показалось слишком простым, чтобы для него делать отдельный компонент
        (select.result.success === true) && <p>Изменения сохранены</p>}
    </form>
  );
}

ArticleForm.propTypes = {
  article: propTypes.object.isRequired,
  onSubmit: propTypes.func
};

ArticleForm.defaultProps = {
  article: {},
  onSubmit: () => {}
};

export default React.memo(ArticleForm);
