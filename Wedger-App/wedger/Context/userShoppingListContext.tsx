/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ShoppingListType,
  EditShoppingListType,
  ListItemObject,
  createShoppingListType,
  addListItemObject,
  EditListItemObject,
} from '../Types/ShoppingListTypes';
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {useAuth} from './userAuthContext';
import {db} from '../environment/firebase';

interface ShoppingListContextType {
  //ShoppingList handle
  createShoppingList: (
    obj: createShoppingListType,
  ) => Promise<DocumentReference<DocumentData, DocumentData> | undefined>;
  editShoppingList: (obj: EditShoppingListType) => void;
  deleteShoppingList: (ShoppingListToDelete: string) => void;
  get_UsersShoppingLists: () => Promise<ShoppingListType[] | []>;
  //item handle
  addListItems: (
    itemsToAdd: addListItemObject[],
    ShoppingListUID: string,
  ) => void;
  editListItem: (item: EditListItemObject, ShoppingListUID: string) => void;
  deleteListItems: (itemID: string, ShoppingListUID: string) => void;
  //util
  loadingShoppingList: boolean;
  userShoppingListError: string;
  usersShoppingLists: ShoppingListType[] | [];
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined,
);

export const ShoppingListProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [loadingShoppingList, setLoadingShoppingList] =
    useState<boolean>(false);
  const [_usersShoppingLists, set_UsersShoppingLists] = useState<
    ShoppingListType[] | []
  >([]);
  const [userShoppingListError, setUserShoppingListError] =
    useState<string>('');
  const {userRef} = useAuth();

  const usersShoppingLists = useMemo(() => {
    return [..._usersShoppingLists];
  }, [_usersShoppingLists]);

  useEffect(() => {
    getCurrentShoppingLists();
  }, [userRef]);

  const getCurrentShoppingLists = async () => {
    if (!userRef) {
      return;
    }
    const listArr = await get_UsersShoppingLists();
    set_UsersShoppingLists(listArr);
  };

  const createShoppingList = async (obj: createShoppingListType) => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const newShoppingList = {
        listName: obj.listName,
        itemsArray: [],
      };
      const ShoppingListCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
      );
      const ShoppingList = await addDoc(
        ShoppingListCollectionRef,
        newShoppingList,
      );
      getCurrentShoppingLists();
      return ShoppingList;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const editShoppingList = async (obj: EditShoppingListType) => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editDocData = {
        ShoppingListName: obj.listName,
      };
      const ShoppingListDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        obj.id,
      );
      await updateDoc(ShoppingListDocRef, editDocData);
      getCurrentShoppingLists();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const deleteShoppingList = async (
    ShoppingListToDelete: string, //shopping list ID
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const ShoppingListDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListToDelete,
      );
      await deleteDoc(ShoppingListDocRef);
      getCurrentShoppingLists();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };

  const get_UsersShoppingLists = async () => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let ShoppingListsReturnArray: ShoppingListType[] = [];
      const ShoppingListCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
      );
      const querySnapshot = await getDocs(ShoppingListCollectionRef);
      for (const item of querySnapshot.docs) {
        const curDoc = item.data() as ShoppingListType;
        curDoc.id = item.id; // Make sure curDoc includes id
        const itemsCollectionRef = collection(
          db,
          'users',
          userRef.uid,
          'ShoppingLists',
          item.id,
          'ListItems',
        );
        const itemsSnapshot = await getDocs(itemsCollectionRef);
        curDoc.itemsArray = itemsSnapshot.docs.map(itemDoc => {
          return {
            id: itemDoc.id,
            itemName: itemDoc.data().itemName,
            checkedOff: itemDoc.data().checkedOff,
          } as ListItemObject;
        });
        ShoppingListsReturnArray.push(curDoc);
      }
      return ShoppingListsReturnArray;
    } catch (e: any) {
      console.error('Failed to fetch shopping lists:', e);
      setUserShoppingListError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
    return [];
  };

  //item handle

  const getListItems = async (
    ShoppingListUID: string,
  ): Promise<ListItemObject[] | []> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let ItemReturnArray: ListItemObject[] = [];
      const ShoppingListItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
      );
      const docsSnap = await getDocs(ShoppingListItemCollectionRef);
      if (docsSnap.empty) {
        return [];
      }
      docsSnap.forEach(item => {
        let currItem = item.data() as unknown as ListItemObject;
        currItem.id = item.id;
        ItemReturnArray.push(currItem);
      });

      // attach to userShoppingLists
      try {
        if (_usersShoppingLists && ItemReturnArray) {
          let tempShoppingLists = _usersShoppingLists;
          const ShoppingListSelectIndex = tempShoppingLists.findIndex(
            ShoppingList => ShoppingList.id === ShoppingListUID,
          );
          tempShoppingLists[ShoppingListSelectIndex].itemsArray =
            ItemReturnArray;
          set_UsersShoppingLists(tempShoppingLists);
        }
      } catch (e) {
        console.log(e);
      }

      //return
      return ItemReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
    return [];
  };

  const addListItems = async (
    itemsToAdd: addListItemObject[],
    ShoppingListUID: string,
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const ShoppingListItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
      );
      for (const item of itemsToAdd) {
        await addDoc(ShoppingListItemCollectionRef, {
          itemName: item.itemName,
          checked: false,
        });
      }
      // Optionally, retrieve the list again or update local state to reflect changes
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const editListItem = async (
    item: EditListItemObject,
    ShoppingListUID: string,
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editItemBuilder = {
        itemName: item.name,
        checked: item.checked,
      };
      const ItemDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
        item.id,
      );
      await updateDoc(ItemDocRef, editItemBuilder);
      getListItems(ShoppingListUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const deleteListItems = async (
    itemIDs: string,
    ShoppingListUID: string,
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const ItemsDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
        itemIDs,
      );
      await deleteDoc(ItemsDocRef);
      getListItems(ShoppingListUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };

  //util

  function addError(arg0: string) {
    setUserShoppingListError(arg0);
  }
  return (
    <ShoppingListContext.Provider
      value={{
        //ShoppingList handle
        createShoppingList,
        editShoppingList,
        deleteShoppingList,
        get_UsersShoppingLists,
        usersShoppingLists,
        //item handle
        addListItems,
        editListItem,
        deleteListItems,
        //util
        loadingShoppingList,
        userShoppingListError,
      }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = (): ShoppingListContextType => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      'useShoppingList must be used within an ShoppingListProvider',
    );
  }
  return context;
};
