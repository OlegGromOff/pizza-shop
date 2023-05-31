import React from "react";

type CategoriesProps = { // создал тип пропсов компонента
  value: number;
  onChangeCategory: (i:number)=> void; // функция которая получает 1 аргумент с типом number и ничего не возвращает
}

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => { // указал тип для пропсов компонента CategoriesProps
  // React.memo - хук для оптимизации производительности (чтобы компонент не перерисовывался при каждом рендере)

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
});

export default Categories;
