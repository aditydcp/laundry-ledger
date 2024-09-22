import { ClothingItem } from "./ClothingItem";

export interface OrderForm {
  laundromartName: string;
  completed: boolean;
  items: ClothingItem[];
}