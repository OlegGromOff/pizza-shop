import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block" // добавил класс чтобы были отступы
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="126" r="125" />
    <rect x="0" y="270" rx="15" ry="15" width="280" height="35" />
    <rect x="-1" y="327" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="444" rx="10" ry="10" width="95" height="30" />
    <rect x="124" y="436" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
