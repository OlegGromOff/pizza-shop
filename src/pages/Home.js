import React from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector - hook для получения данных из store
import qs from "qs"; // qs - библиотека для работы с query string
import { useNavigate, Link } from "react-router-dom"; // useNavigate - hook для перехода по страницам без перезагрузки
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice"; // импортирую actions из filterSlice.js
import { fetchPizzas } from "../redux/slices/pizzaSlice"; // импортирую actions из pizzaSlice.js
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { sortList } from "../components/Sort"; // импортирую массив сортировок
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { selectPizzaData } from "../redux/slices/pizzaSlice"; // импортирую селектор из pizzaSlice.js
import { selectFilter } from "../redux/slices/filterSlice"; // импортирую селектор из filterSlice.js

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // dispatch - hook для отправки данных в store
  const { items, status } = useSelector(selectPizzaData); // получил данные стора из slices/store.js
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter); // получил данные стора из slices/store.js
  const sortType = sort.sortProperty;
  const isSearch = React.useRef(false); // использую тут useRef для хранения данных между рендерами (чтобы не перерендеривался компонент)
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id)); // отправил в store categoryId с помощью экшена setCategoryId
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page)); // отправил в store currentPage с помощью экшена setCurrentPage
  };

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc"; // если в sortProperty есть "-" то asc, иначе desc
    const sortBy = sortType.replace("-", ""); // убрал "-" из sortProperty
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : ""; // если searchValue не пустая строка то добавляю search= и то что ввел пользователь

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    ); // получил данные с сервера и записал в items (res.data - данные которые приходят с сервера), res - ответ от сервера

    window.scrollTo(0, 0); // при переходе на эту страницу скролл вверх
  };

  // если изменился categoryId, sortType, currentPage или searchValue, и был первый рендер  то отправляю запрос на сервер
  React.useEffect(() => {
    // выполним код только если это не первый рендер
    if (isMounted.current) {
      // если первый рендер уже был
      const queryString = qs.stringify({
        // qs.stringify - превращает объект в строку с параметрами запроса, типа  ?sortBy=rating&order=desc
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`); // navigate - переход на страницу без перезагрузки (передаю параметры запроса в строку браузера, типа ?sortBy=rating&order=desc)
    }

    isMounted.current = true; // первый рендер уже был
  }, [categoryId, sortType, currentPage]);

  // если был первый рендер, то проверяю есть ли параметры запроса в строке браузера и если есть то отправляю их в store
  React.useEffect(() => {
    if (window.location.search) {
      // если есть параметры запроса в строке браузера
      const query = qs.parse(window.location.search.slice(1)); // qs.parse - превращает строку с параметрами запроса в объект, типа  ?sortBy=rating&order=desc  ->  {sortBy: "rating", order: "desc"} и убрал ? с помощью slice(1)
      const sort = sortList.find(
        (obj) => obj.sortProperty === query.sortProperty
      ); // нашел в массиве sortList объект с таким же sortProperty как в query.sortProperty
      dispatch(setFilters({ ...query, sort })); // отправил в store categoryId, currentPage, sort с помощью экшена setFilters
      isSearch.current = true; // если пользователь перешел на страницу с параметрами запроса в строке браузера, то он использовал поиск
    }
  }, []);

  // если был первый рендер, то отправляю запрос на сервер
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      // если пользователь не использовал поиск, то запускаю getPizzas
      getPizzas();
    }
    isSearch.current = false; // сбросил флаг
  }, [categoryId, sortType, searchValue, currentPage]); // если поменял категорию или сортировку или использовал поиск или использовал пагинацию, то запускаю useEffect

  const pizzas = items?.map(
    (
      pizza // если isLoading false, то показываю карточки с пиццами
    ) => (
      //переход на страницу пиццы
      <Link to={`/pizza/${pizza.id}`} key={pizza.id}>
        <PizzaBlock
          {...pizza} // передал все свойства объекта pizza
        />
      </Link>
    )
  );

  const skeletons = [...new Array(6)].map(
    // нижнее подчеркивание в аргументах чтобы js не ругался из-за того что в массиве нет значений
    (
      _,
      index // если isLoading true, то показываю 6 пустых карточек. Сделал массив из 6 блоков чтобы не прыгали изображения при загрузке потому что изначально items = 0
    ) => <Skeleton key={index} />
  );
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Ошибка при загрузке данных</h2>
          <p>
            Попробуйте перезагрузить страницу или обратитесь к администратору
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? skeletons // если status loading, то показываю 6 пустых карточек. Сделал массив из 6 блоков чтобы не прыгали изображения при загрузке потому что изначально items = 0
            : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
