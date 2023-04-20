import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams - hook для получения параметров из url
import axios from "axios";

const FullPizza = () => {
  const params = useParams(); // получаем параметры из url
  const { id } = params; // деструктуризируем параметры
  const [pizza, setPizza] = React.useState({}); // создаем стейт для пиццы, в котором будет храниться объект с данными пиццы
  const navigate = useNavigate(); // hook для перехода по ссылкам

  React.useEffect(() => {
    // делаем запрос на сервер за данными по id пиццы
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64090850d16b1f3ed6c92dc6.mockapi.io/items/" + id
        );
        setPizza(data); // записываем данные в стейт
      } catch (error) {
        alert("Error");
        navigate("/"); // переходим на главную страницу
      }
    }
    fetchPizza();
  }, []);

  const { imageUrl, title, price } = pizza; // деструктуризируем объект с данными пиццы

  if (!pizza) {
    // если нет данных, то показываем загрузку
    return "Download...";
  }

  return (
    <div className="container">
      <img src={imageUrl} alt="Pizza" />
      <h2>{title}</h2>
      <h4>{price} uah</h4>
    </div>
  );
};

export default FullPizza;