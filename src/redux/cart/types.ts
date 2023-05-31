export type CartItem = { // создал тип
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string, // тонкое или традиционное
    size: number,
    count: number,
  }
  
  export interface CartSliceState { // interface - это тип, который описывает структуру объекта (всегда только объекта)
    totalPrice: number,
    items: CartItem[],
  }