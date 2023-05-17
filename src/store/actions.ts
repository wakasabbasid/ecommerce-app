import { Product } from "../typeUtilities/types";

export const addToBasket = (product: Product) => ({
  type: "ADD_TO_BASKET",
  payload: product,
});
export const removeFromBasket = (itemId: number) => {
  return {
    type: "REMOVE_FROM_BASKET",
    payload: itemId,
  };
};

export const updateQuantity = (itemId: number, newQuantity: number) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: {
      itemId,
      newQuantity,
    },
  };
};
