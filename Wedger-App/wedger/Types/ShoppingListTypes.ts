import {ColorValue} from 'react-native';

export interface ShoppingListType {
  id: string;
  listName: string;
  itemsArray: ListItemObject[];
}
export interface EditShoppingListType {
  id: string;
  listName?: string;
}
export interface EditListItemObject {
  id: string;
  name?: string;
  checked?: string;
}
export interface ListItemObject {
  id: string;
  itemName: string;
  checkedOff: boolean;
}
export interface addListItemObject {
  id: string; 
  itemName: string;
  checked?: boolean;
}
export interface createShoppingListType {
  id?: string;
  listName: string;
  itemsArray: addListItemObject[];
}
