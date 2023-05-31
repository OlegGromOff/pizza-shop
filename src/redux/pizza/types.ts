export type Pizza = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  type: number, // тонкое или традиционное
  size: number,
  count: number,
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
  //  "loading" | "success" | "error"; 
}

export enum Status{ // enum - это тип, который описывает структуру объекта (всегда только объекта)
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type fetchPizzasArgs = Record<string, string>; // Record<string, string> - объект с ключами и значениями типа string. Используй Record если ключи и значения в объекте все одного типа

export type SearchPizzaParams = {
  sortBy: string;  
  order: string; 
  category: string; 
  search: string; 
  currentPage: string;
} 