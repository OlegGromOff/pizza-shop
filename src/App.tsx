import "./scss/app.scss";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import React, {Suspense} from "react";
import Home from "./pages/Home";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart')); // ленивая загрузка компонента (только для функциональных компонентов) - подгружается только когда пользователь переходит на эту страницу (только для роутов) - уменьшает время загрузки приложения - уменьшает размер бандла 
/* webpackChunkName: "Cart" */ // это комментарий для webpack, чтобы он назвал файл с бандлом как мы хотим
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* MainLayout - это обертка для всех страниц, используй если много роутов */}
            <Route path="" element={<Home />} />
            <Route path="cart" element={
            <Suspense fallback={<div>Loading...</div>}> 
              <Cart />
            </Suspense>
            } />
            <Route path="pizza/:id" element={
            <Suspense fallback={<div>Loading...</div>}> 
              <FullPizza />
              </Suspense>  
            } />{" "}
            {/* :id - это параметр, динамический роутер, можно написать вместо id что угодно, можно написать  /pizza/:smyasom/:pizzas */}
            {/* если не совпадает ни один путь, то показываю NotFound (404 page) */}
            <Route path="*" element={
            <Suspense fallback={<div>Loading...</div>}> 
              <NotFound />
            </Suspense>
            } />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
