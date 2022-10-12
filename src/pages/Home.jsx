import React, { useRef } from 'react';

import '../scss/app.scss';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Search from '../components/Search/Search';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [catrgoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  // const stopRes = useRef(false); //  хук юзреф для фикса бага с двойным запросом

  // [] - зависимость то что внутри изменилось - вызывает функцию снова

  // if (stopRes.current === false) {
  //   fetch('https://633f01260dbc3309f3c2eead.mockapi.io/items')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((arr) => {
  //       setItems(arr); // тут мы прокидываем из бека данные в юзстейт и дальше рендерим
  //       console.log('OTVET', arr);
  //     });
  // }
  let pizzasUrl = 'https://63427c853f83935a7843d23c.mockapi.io/items?page=${currentPage}&limit=4';

  React.useEffect(() => {
    setIsLoading(true);
    // if (catrgoryId === 0) {
    //   pizzasUrl = 'https://63427c853f83935a7843d23c.mockapi.io/items?';
    // } else {
    //   pizzasUrl = 'https://63427c853f83935a7843d23c.mockapi.io/items?category=' + catrgoryId;
    // }
    console.log(pizzasUrl + 'PIIIIIZZZZZAAA');
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://63427c853f83935a7843d23c.mockapi.io/items?page=${currentPage}&limit=4${
        catrgoryId > 0 ? `category=${catrgoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? 'asc' : 'desc'
      }${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr); // тут мы прокидываем из бека данные в юзстейт и дальше рендерим
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [catrgoryId, sortType, searchValue, currentPage]); // сюда зависимость для юзэффекта передаем
  console.log(catrgoryId, sortType, searchValue, 'PROOOPRS HOME');

  const pizzasObj = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const pizzasObj1 = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={catrgoryId} onChangeategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* {items.map((obj) =>
              isLoading ? (
                <Skeleton />
              ) : (
                <PizzaBlock
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                  // либо  <PizzaBlock {...obj} передает все обьекты при условии совпадений
                />
              ),
            )} */}

        {isLoading ? skeletons : pizzasObj1}
      </div>
      <Pagination
        onChangePage={(numbeer) => setCurrentPage(numbeer)}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default Home;
