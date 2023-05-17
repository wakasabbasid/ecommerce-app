import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  UPDATE_QUANTITY,
} from "../constants";

export interface AppState {
  basketItems: BasketItem[];
}

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  img: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  colour: string;
  img: string;
}
export interface AddToBasketAction {
  type: typeof ADD_TO_BASKET;
  payload: Product;
}

export interface RemoveFromBasketAction {
  type: typeof REMOVE_FROM_BASKET;
  payload: number;
}

export interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY;
  payload: {
    itemId: number;
    newQuantity: number;
  };
}
export interface Category {
  name: string;
}

export interface MenuSection {
  name: string;
  img: string;
  children: Category[];
}

export interface MenuData {
  sections: MenuSection[];
}
export interface MenuScreenProps {
  menuData: MenuData;
}

export interface Category {
  name: string;
  categories?: string[];
}

export interface MenuSection {
  name: string;
  img: string;
  children: Category[];
}
