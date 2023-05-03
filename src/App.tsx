import "./scss/app.scss";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* MainLayout - это обертка для всех страниц, используй если много роутов */}
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<FullPizza />} />{" "}
            {/* :id - это параметр, динамический роутер, можно написать вместо id что угодно, можно написать  /pizza/:smyasom/:pizzas */}
            {/* если не совпадает ни один путь, то показываю NotFound (404 page) */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
