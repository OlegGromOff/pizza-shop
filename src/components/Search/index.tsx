import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search:React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null); // создаю реф для инпута Тип или null или HTMLInputElement

  const updateSearchValue = React.useCallback(
    //ccылка на отложенную функцию
    debounce((str:string) => {
      // чтобы работало правильно надо использовать useCallback чтобы функция не пересоздавалась при каждом рендере
      dispatch(setSearchValue(str)); // обновляю значение поиска в контексте
    }, 250), // создаю дебаунс функцию для теста (вызывается только после того как пользователь перестал вводить текст в инпут) через 250 мс
    [] // пустой массив означает что функция будет вызываться только один раз, при первом рендере. Если не передать пустой массив, то функция будет вызываться каждый раз при рендере
  );

  const onClickClear = () => {
    dispatch(setSearchValue("")); // очищаем инпут поиска в контексте
    setValue(""); // очищаем значение инпута локально
    inputRef.current?.focus(); // ставим фокус на инпут
    // inputRef.current это то же самое что document.querySelector("input")
  };

  const onChangeInput = (event:any) => {
    setValue(event.target.value); // обновляю значение инпута
    updateSearchValue(event.target.value); // вызываю функцию дебаунса (передаю в нее значение инпута с задержкой)
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef} // привязываю реф к инпуту
        className={styles.input}
        value={value}
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
        // {(event) => setSearchValue(event.target.value)}
      />
      {value && ( // если поле поиска не пустая строка, то показываю иконку закрытия
        <svg
          onClick={onClickClear} // при клике на иконку закрытия очищаю поле поиска и ставлю фокус на инпут
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
