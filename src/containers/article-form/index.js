import React, {useState} from 'react';
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

  const select = useSelector(state => ({
    countries: state.countries.items,
    categories: state.categories.items,
    result: state.articleForm.requestResult,
  }));

  let [category, setCategory] = useState(article.category?._id);
  let [country, setCountry] = useState(article.maidIn?._id);
  const {errors = {}} = select.result;

  return (
    <form className={className()} onSubmit={onSubmit}>
      {article._id && <Link to={'/articles/' + article._id}>Просмотр</Link>}
      <Field label="Название" message={errors["title.'ru'"]}>
        <Input name="title" value={article.title}/>
      </Field>

      <Field label="Описание" message={errors.description}>
        <Input tagName="textarea" theme="area" name="description" value={article.description}/>
      </Field>

      <Field label="Страна производитель" message={errors.maidIn}>
        <Select name="maidIn" value={country} onChange={e => setCountry(e)} options={select.countries}/>
      </Field>

      <Field label="Категория" message={errors.category}>
        <Select name="category" value={category} onChange={e => setCategory(e)} options={select.categories}/>
      </Field>

      <Field label="Год выпуска" message={errors.edition}>
        <Input type="number" name="edition" value={article.edition}/>
      </Field>

      <Field label="Цена (₽)" message={errors.price}>
        <Input type="number" name="price" value={article.price}/>
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
