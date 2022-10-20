import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCatId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import '../scss/app.scss';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { listSort } from '../components/Sort';
import { setItemsPizza, fetchPizzas } from '../redux/slices/pizzaSlice.js'; // хз!!!

//import Search from '../components/Search/Search';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const catrgoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const sortProperty1 = useSelector((state) => state.filter.sort.sortProperty);
  const status = useSelector((state) => state.pizza.status);
  const searchValue = useSelector((state) => state.filter.searchValue);
  console.log(status, ' STATUS');

  const items = useSelector((state) => state.pizza.items);
  //создаем переменную в которую пишем юзселектор - туда передаем стейт а от туда тянем переменную

  //const { searchValue } = React.useContext(SearchContext); // замена на редакс выше

  /* {const [items, setItems] = React.useState([]);} */

  //const [catrgoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  const onChangeategory = (id) => {
    dispatch(setCatId(id));
  };

  // const stopRes = useRef(false); //  хук юзреф для фикса бага с двойным запросом
  // [] - зависимость то что внутри изменилось - вызывает функцию снова

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';

    /* {
      await axios
        .get(
          `https://-63427c853f83935a7843d23c.mockapi.io/items?page=${currentPage}&limit=4${
            catrgoryId > 0 ? `&category=${catrgoryId}` : ''
          }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
            sortType.sortProperty.includes('-') ? 'asc' : 'desc'
          }${search}`,
        )
        .then((response) => {
          // console.log(response, 'RESPONSEE');
          // return response.json(); // в axios не нужен
          setItems(response.data);
          setIsLoading(false);
          console.log(6666);
        })
        .catch((err) => {
          console.log(err.code, 'Axios Error');
          setIsLoading(false);
        });
    }*/

    // const res = await axios.get(
    // const { data } = await axios.get(
    //   `https:///63427c853f83935a7843d23c.mockapi.io/items?page=${currentPage}&limit=4${
    //     catrgoryId > 0 ? `&category=${catrgoryId}` : ''
    //   }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
    //     sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    //   }${search}`,
    // );
    dispatch(
      fetchPizzas({
        sortType,
        search,
        catrgoryId,
        currentPage,
      }),
    );

    // console.log(data, 'DATA');
    //  dispatch(setItemsPizza(data));

    /*finally {
      setIsLoading(false); // исполнится при любом варианте
    } */

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    const catArr = [0, 1, 2, 3, 4, 5];
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      //  console.log(params.catrgoryId, 'SORT PROPRTY_PARAMS');
      const sort = listSort.find((obj) => obj.sortProperty === params.sortProperty);
      const categoryId = catArr.find((obj) => obj == params.catrgoryId);
      //const catsId = (obj) => {params.catrgoryId};
      dispatch(
        setFilters({
          ...params,
          sort,
          categoryId,
        }),

        //   console.log('PAARAMMS_1 + ', params.catrgoryId),
        // console.log('PAARAMMS_2 + ', categoryId),
      );
      //     console.log('ебнул фолс ONE1', isSearch);
      //isSearch.current = !isSearch;
      isSearch.current = true;
      //  console.log('ебнул фолс ONE2', isSearch);
    }
  }, []);

  // [ ] означает только при первом рендере пустые

  //дальше парсинг

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (isSearch.current) {
      getPizzas();
    }
    // console.log('ебнул фолс TWO1', isSearch);
    isSearch.current = true;
    // console.log('ебнул фолс TWO2', isSearch);
  }, [catrgoryId, sortType.sortProperty, searchValue, currentPage]); // сюда зависимость для юзэффекта передаем
  // console.log(catrgoryId, sortType, searchValue, 'PROOOPRS HOME');

  // const pizzasObj = items
  //   .filter((obj) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  // дальше ссылку в браузер делаем// первый рендер это
  React.useEffect(() => {
    if (isMounted.current) {
    }

    const queryString = qs.stringify({
      sortProperty: sortType.sortProperty,
      catrgoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [catrgoryId, sortType, currentPage]);
  //console.log(sortType.sortProperty)
  const pizzasObj1 = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        {/* <Categories value={catrgoryId} onChangeategory={(id) => setCategoryId(id)} /> */}
        <Categories value={catrgoryId} onChangeategory={onChangeategory} />

        {/* <Sort value={sortType} onChangeSort={(id) => setSortType(id)} /> */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2> Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось загрузить пиццу. Повторите попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzasObj1}</div>
      )}

      <Pagination
        onChangePage={onChangePage}
        currentPage={currentPage}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default Home;
