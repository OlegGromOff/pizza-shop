import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => { // sum - аккумулятор, obj - текущий элемент массива
        return obj.price * obj.count + sum; // суммирую цену всех пицц * на количество(count)
      }, 0);
}