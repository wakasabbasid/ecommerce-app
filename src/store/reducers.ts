import { BasketItem } from "../typeUtilities/interface";
import { AppAction } from "../typeUtilities/types";

export interface AppState {
  basketItems: BasketItem[];
}

const initialState: AppState = {
  basketItems: [],
};

export const reducer = (
  state: AppState = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const product = action.payload;
      const existingItemIndex = state.basketItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedBasketItems = [...state.basketItems];
        const existingItem = updatedBasketItems[existingItemIndex];
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        updatedBasketItems[existingItemIndex] = existingItem;

        return {
          ...state,
          basketItems: updatedBasketItems,
        };
      } else {
        const newBasketItem: BasketItem = {
          ...product,
          quantity: 1,
          totalPrice: product.price,
        };

        return {
          ...state,
          basketItems: [...state.basketItems, newBasketItem],
        };
      }
    case "REMOVE_FROM_BASKET":
      const removeItemId = action.payload;
      const updatedBasketItems = state.basketItems.filter(
        (item) => item.id !== removeItemId
      );

      return {
        ...state,
        basketItems: updatedBasketItems,
      };
    case "UPDATE_QUANTITY":
      const { itemId, newQuantity } = action.payload;
      const updatedItems = state.basketItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.price * newQuantity,
          };
        }
        return item;
      });

      return {
        ...state,
        basketItems: updatedItems,
      };
    default:
      return state;
  }
};
