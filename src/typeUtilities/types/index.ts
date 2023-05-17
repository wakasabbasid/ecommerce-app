import {
  AddToBasketAction,
  RemoveFromBasketAction,
  UpdateQuantityAction,
} from "../interface";

export type AppAction =
  | AddToBasketAction
  | RemoveFromBasketAction
  | UpdateQuantityAction;

