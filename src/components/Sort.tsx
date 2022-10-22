import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

type sortItem1 = {
  name: string;
  sortProperty: string;
};

export const listSort: sortItem1[] = [
  { name: 'популярности более', sortProperty: 'rating' },
  { name: 'популярности менее', sortProperty: '-rating' },
  { name: 'цене дорогие', sortProperty: 'price' },
  { name: 'цене убыв', sortProperty: '-price' },
  { name: 'алфавиту с конца', sortProperty: 'title' },
  { name: 'алфавиту с нач', sortProperty: '-title' },
];
// function Sort({ value, onChangeSort }) {

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  //  console.log(sort, 'fwafwaf');
  // const list = ['популярности', 'цене', 'алфавиту'];
  // const [selected, setSelected] = React.useState(0); // локальный стейт

  const [open, setOpen] = React.useState(true);

  const onClickListeItem = (obj: sortItem1) => {
    // setSelected(i); // локальный стейт
    //  onChangeSort(i);
    dispatch(setSort(obj));
    setOpen(false);
  };
  //console.log(sortRef, 'RRREEFF');
  React.useEffect(() => {
    //sortRef;
    const handleClickOunside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOunside);
    return () => {
      document.body.removeEventListener('click', handleClickOunside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {
          // list[selected на value]
        }
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {listSort.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListeItem(obj)} // тут вытаскиваем из локального стейта
                // ниже мы меняем selected на props value
                className={sort.sortProperty == obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;
