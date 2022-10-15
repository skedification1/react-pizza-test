import React from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce'; // отложенная загрузка из лоудэш

//const Search = ({ searchValue, setSearchValue }) => {

const Search = () => {
  const [value, setValue] = React.useState(''); // локальный для отображения данных быстрых

  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue(''); // очистка в контексте
    setValue(''); // локальная очистка
    inputRef.current.focus();
  };

  // console.log(inputRef, 'REFFFFF');
  // React.useEffect(() => {
  //   console.log(document.querySelector('input'), 'SEARCH');
  // }, []);
  //
  //
  //
  //
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str); // туту запрос на сервак
      console.log('HELLOW');
    }, 1000),
    [],
  );
  //
  //
  //
  //
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" fill="none" r="9" />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        // value={searchValue}
        // onChange={(event) => setSearchValue(event.target.value)}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск Пиццы..."
      />
      {/* {searchValue && ( */}
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
