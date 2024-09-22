import { ClothingItem } from "./ClothingItem";

export interface OrderItem {
  id: number;
  name: string;
  completed: boolean;
  items: ClothingItem[];
}