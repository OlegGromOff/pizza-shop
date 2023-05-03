import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort } from "../redux/slices/filterSlice";

type SortItem = { // создал свой тип для элемента списка сортировки (могу его переиспользовать)
  name: string;
  sortProperty: string;
}

export const sortList: SortItem[] = [ // указал тип как массив объектов 
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort); // получил sort из store (если он изменится то весь этот компонет перерисуется) selectSort - чтобы не дублировать код
  const [isVisible, setVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null); // useRef - хук для хранения данных между рендерами. Указал тут тип HTMLDivElement и по умолчанию null, потому что в TS нельзя оставлять значение пустым(undefined)

  const onClickListItem = (obj: SortItem) => {
    // выбрал элемент из списка и закрыл список
    // onChangeSort(i);
    setVisible(false);
    dispatch(setSort(obj)); // отправил в store объект с данными сортировки с помощью экшена setSort
  };
  React.useEffect(() => {
    const handleOutsideClick = (event:any) => {
      let pathEvent = event.composedPath(); // получаем массив элементов по которым кликнули
      if (!pathEvent.includes(sortRef.current)) {
        // если кликнули не по сортировке, то закрыть список
        setVisible(false);
      }
    };
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      // при размонтировании компонента удаляем обработчик события (при переходе на другую страницу) чтобы этот обработчик не отрабатывал на других страницах
      document.body.removeEventListener("click", handleOutsideClick);
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
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && ( // if isVisible is true, then show the following
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => onClickListItem(obj)}
              >
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