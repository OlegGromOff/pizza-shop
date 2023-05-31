import React from "react";
import { useDispatch } from "react-redux";
import { Sort, SortPropertyEnum } from "../redux/filter/types";
import { setSort } from "../redux/filter/slice";

type SortItem = { // создал свой тип для элемента списка сортировки (могу его переиспользовать)
  name: string;
  sortProperty: SortPropertyEnum;
}

type PopupClick= MouseEvent & {
  path: Node[];
}; // после & создал свой тип для событий клика и нажатия клавиши

type SortPopupProps = {
  value: Sort;
}

export const sortList: SortItem[] = [ // указал тип как массив объектов 
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];



const SortPopup: React.FC<SortPopupProps> = React.memo(({value}) => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null); // useRef - хук для хранения данных между рендерами. Указал тут тип HTMLDivElement и по умолчанию null, потому что в TS нельзя оставлять значение пустым(undefined)


  
  const onClickListItem = (obj: SortItem) => {
    // выбрал элемент из списка и закрыл список
    // onChangeSort(i);
    setVisible(false);
    dispatch(setSort(obj)); // отправил в store объект с данными сортировки с помощью экшена setSort
  };
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const _event = event as PopupClick; // привел event к своему типу (_event - это тот же event только с другим типом)
      if (sortRef.current && !_event.path?.includes(sortRef.current)) {
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
        <span onClick={() => setVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && ( // if isVisible is true, then show the following
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
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
});

export default SortPopup;
