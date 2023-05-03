import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom"; // Outlet - компонент, который отрисовывает дочерние компоненты, пришел на смену children

const MainLayout:React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
