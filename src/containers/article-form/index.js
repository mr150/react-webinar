import React, {useState} from 'react';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname';
import {Link} from "react-router-dom";
import Input from "../../components/input";
import Select from "../../components/select";
import './styles.css';

function ArticleForm({article, onSubmit}) {

  // CSS классы по БЭМ
  const className = cn('ArticleForm');

  const select = useSelector(state => ({
    countries: state.articleForm.countries,
    categories: state.categories.items,
    result: state.articleForm.requestResult,
  }));

  let [category, setCategory] = useState(article.category?._id);
  let [country, setCountry] = useState(article.maidIn?._id);

  return (
    <form className={className()} onSubmit={onSubmit}>
      {select.result.success !== true && <Link to={'/articles/' + article._id}>Отмена</Link>}
      <p>
        <label>
          <span className={className('Label')}>Название</span>
          <Input name="title" value={article.title}/>
        </label>
      </p>

      <p>
        <label>
          <span className={className('Label')}>Описание</span>
          <Input tagName="textarea" theme="area" name="description" value={article.description}/>
        </label>
      </p>

      <p>
        <label>
          <span className={className('Label')}>Страна производитель</span>
          <Select name="maidIn" value={country} onChange={e => setCountry(e)} options={select.countries}/>
        </label>
      </p>

      <p>
        <label>
          <span className={className('Label')}>Категория</span>
          <Select name="category" value={category} onChange={e => setCategory(e)} options={select.categories}/>
        </label>
      </p>

      <p>
        <label>
          <span className={className('Label')}>Год выпуска</span>
          <Input name="edition" value={article.edition}/>
        </label>
      </p>

      <p>
        <label>
          <span className={className('Label')}>Цена (₽)</span>
          <Input name="price" value={article.price}/>
        </label>
      </p>

      <button>Сохранить</button>
      {
        select.result.success === false ?
          (<ul>
            {select.result.errors.map((item, i) => (
              <li key={i}>Ошибка в поле <i>{item.path}</i>: {item.message}</li>
            ))}
           </ul>) :
        (select.result.success === true) && <p>Изменения сохранены</p>
      }
    </form>
  );
}

ArticleForm.propTypes = {
  article: propTypes.object.isRequired,
  onSave: propTypes.func
};

ArticleForm.defaultProps = {
  article: {},
  onSave: () => {}
};

export default React.memo(ArticleForm);
