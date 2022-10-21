import React from 'react';

type CategoriesProps1 = {
  value: number;
  onChangeategory: any;
};

const Categories: React.FC<CategoriesProps1> = ({ value, onChangeategory }) =>
  //function Categories()
  {
    // const [activeIndex, setActiveIndex] = React.useState(0); // локальный стейт

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              //onClick={() => setActiveIndex(i)} тут вытаскивали из локального стейта
              onClick={() => onChangeategory(i)}
              // className={activeIndex == i ? 'active' : ''}> тоже лок стейт
              className={value == i ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Categories;
