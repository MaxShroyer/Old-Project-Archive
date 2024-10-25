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
  BudgetType,
  EditBudgetType,
  EditItemObject,
  ItemObject,
  addItemObject,
  createBudgetType,
} from '../Types/BudgetTypes';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {useAuth} from './userAuthContext';
import {db} from '../environment/firebase';

interface BudgetContextType {
  //budget handle
  createBudget: (obj: createBudgetType) => void;
  editBudget: (obj: EditBudgetType) => void;
  deleteBudget: (budgetToDelete: string) => void;
  getUsersBudgets: () => Promise<BudgetType[]>;
  getAllReceipts: (budgetUID: string) => Promise<URL[]>;
  //item handle
  getRecept: (receptRefId: string) => void;
  getItemsExpended: (budgetUID: string) => Promise<ItemObject[]>;
  addExpendedItems: (itemsToAdd: addItemObject[], budgetUID: string) => void;
  editExpendedItem: (item: EditItemObject, budgetUID: string) => void;
  deleteExpendedItems: (itemID: string[], budgetUID: string) => void;
  //util
  searchItems: (search?: string) => Promise<ItemObject[]>;
  loadingBudget: boolean;
  userBudgetError: string;
  usersBudgets: BudgetType[];
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [loadingBudget, setLoadingBudget] = useState<boolean>(false);
  const [_usersBudgets, set_UsersBudgets] = useState<BudgetType[]>([]);
  const [userBudgetError, setUserBudgetError] = useState<string>('');
  const {userData, userRef} = useAuth();

  const usersBudgets = useMemo(() => {
    return _usersBudgets;
  }, [_usersBudgets]);

  useEffect(() => {
    getCurrentBudgets();
  }, [userRef]);

  const getCurrentBudgets = async () => {
    if (!userRef) {
      return;
    }
    const bugArr = await getUsersBudgets();
    set_UsersBudgets(bugArr);
    return bugArr;
  };

  const createBudget = async (obj: createBudgetType) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const newBudget = {
        budgetName: obj.budgetName,
        labelColor: obj.labelColor,
        spendTarget: obj.spendTarget,
        timeFrame: obj.timeFrame,
        spendCurrent: 0,
      };
      const budgetCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
      );
      const budget = await addDoc(budgetCollectionRef, newBudget);
      getCurrentBudgets();
      return budget;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const editBudget = async (obj: EditBudgetType) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editDocData = {
        budgetName: obj.budgetName,
        labelColor: obj.labelColor,
        spendTarget: obj.spendTarget,
        timeFrame: obj.timeFrame,
        spendCurrent: obj.spendCurrent,
      };
      const budgetDocRef = doc(db, 'users', userRef.uid, 'budgets', obj.docId);
      await updateDoc(budgetDocRef, editDocData);
      getCurrentBudgets();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const deleteBudget = async (budgetToDelete: string) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const budgetDocRef = doc(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetToDelete,
      );
      await deleteDoc(budgetDocRef);
      getCurrentBudgets();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const getUsersBudgets = async (): Promise<BudgetType[]> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let BudgetsReturnArray: BudgetType[] = [];
      const budgetCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
      );
      const docsSnap = await getDocs(budgetCollectionRef);
      if (docsSnap.empty) {
        console.log('budgets Empty');
        return BudgetsReturnArray;
      }
      docsSnap.forEach(async el => {
        let curDoc = el.data() as unknown as BudgetType;
        curDoc.id = el.id;
        BudgetsReturnArray.push(curDoc);
        // getItemsExpended(el.id);
      });
      set_UsersBudgets(BudgetsReturnArray);
      return BudgetsReturnArray;
    } catch (e: any) {
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
    return [];
  };

  //TODO: implement
  const getAllReceipts = async (budgetUID: string): Promise<URL[]> => {
    console.log(budgetUID, 'get recipes');
    return [];
  };

  //item handle

  //TODO: implement
  const getRecept = async (receptRefId: string) => {
    console.log(receptRefId, 'recept id');
  };

  const getItemsExpended = async (budgetUID: string): Promise<ItemObject[]> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let ItemReturnArray: ItemObject[] = [];
      const budgetItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
      );
      const docsSnap = await getDocs(budgetItemCollectionRef);
      if (docsSnap.empty) {
        //console.log('Items Empty in', budgetUID);
        return [];
      }
      docsSnap.forEach(item => {
        const currItem = item.data() as unknown as ItemObject;
        //console.log(currItem);
        ItemReturnArray.push(currItem);
      });

      // attach to userBudgets
      try {
        if (_usersBudgets && ItemReturnArray) {
          let tempBudgets = [..._usersBudgets];
          const budgetSelectIndex = tempBudgets.findIndex(
            budget => budget.id === budgetUID,
          );
          if (budgetSelectIndex !== -1) {
            (tempBudgets[budgetSelectIndex].itemsExpended = ItemReturnArray),
              // console.log(tempBudgets[budgetSelectIndex].itemsExpended);
              set_UsersBudgets(tempBudgets);
          }
        }
      } catch (e) {
        console.error(e);
      }
      //return
      return ItemReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
    return [];
  };

  const addExpendedItems = async (
    itemsToAdd: addItemObject[],
    budgetUID: string,
  ) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const currentBudget = [..._usersBudgets].find(
        budget => budget.id === budgetUID,
      );

      if (!currentBudget) {
        console.log('ooof');
      }
      const budgetItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
      );
      const budgetDocRef = doc(db, 'users', userRef.uid, 'budgets', budgetUID);
      const currentSpend = () => {
        let tempTotal = currentBudget ? currentBudget.spendCurrent : 0;
        itemsToAdd.forEach(item => {
          tempTotal += item.cost;
        });
        return tempTotal;
      };
      const addArrayBuilder = itemsToAdd;

      const tempBudget = {
        spendCurrent: currentSpend(),
      };
      addArrayBuilder.forEach(
        async el => await addDoc(budgetItemCollectionRef, el),
      );
      await updateDoc(budgetDocRef, tempBudget);

      getCurrentBudgets();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const editExpendedItem = async (item: EditItemObject, budgetUID: string) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editItemBuilder = {
        name: item.name,
        date: item.date,
        location: item.location,
        cost: item.cost,
        quantity: item.quantity,
        unitCost: item.unitCost,
        category: item.category,
        paymentType: item.paymentType,
        addMethod: item.addMethod,
        Reoccurring: item.Reoccurring,
      };
      const ItemDocRef = doc(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
        item.id,
      );
      await updateDoc(ItemDocRef, editItemBuilder);
      getItemsExpended(budgetUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const deleteExpendedItems = async (itemIDs: string[], budgetUID: string) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }

      itemIDs.forEach(async itemID => {
        const ItemsDocRef = doc(
          db,
          'users',
          userRef.uid,
          'budgets',
          budgetUID,
          'expendedItems',
          itemID,
        );
        await deleteDoc(ItemsDocRef);
      });
      getItemsExpended(budgetUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  //util

  //TODO: implement
  const searchItems = async (search?: string): Promise<ItemObject[]> => {
    console.log(search, 'search');
    return [];
  };

  function addError(arg0: string) {
    setUserBudgetError(arg0);
  }
  return (
    <BudgetContext.Provider
      value={{
        //budget handle
        createBudget,
        editBudget,
        deleteBudget,
        getUsersBudgets,
        getAllReceipts,
        usersBudgets,
        //item handle
        getRecept,
        getItemsExpended,
        addExpendedItems,
        editExpendedItem,
        deleteExpendedItems,
        //util
        searchItems,
        loadingBudget,
        userBudgetError,
      }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within an BudgetProvider');
  }
  return context;
};
