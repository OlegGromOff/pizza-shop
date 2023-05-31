import { CartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data!) : []; // if there is a cart in LS, return it, otherwise return an empty array
    const totalPrice = calcTotalPrice(items); // calculate the total price of the cart

    return {
        items: items as CartItem[],
        totalPrice
    }
}