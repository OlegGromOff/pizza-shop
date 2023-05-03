import React from "react";

type CategoriesProps = { // создал тип пропсов компонента
  value: number;
  onChangeCategory: any;
}

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => { // указал тип для пропсов компонента CategoriesProps
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index} // если массив статичный и не будет меняться то можно использовать index
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
