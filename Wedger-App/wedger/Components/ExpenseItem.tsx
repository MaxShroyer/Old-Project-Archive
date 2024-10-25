/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ItemObject, addItemObject} from '../Types/BudgetTypes';
import {Button, ListItem} from '@rneui/themed';
import PopupModal from './PopupModal';
import {useBudget} from '../Context/userBudgetContext';
import ExpenseItemModal from './ExpenseItemModal';
import theme from '../theme';

interface Props {
  itemData: ItemObject | addItemObject;
  budgetID: string;
  disableSwipe?: boolean;
  removeTempObj?: () => void;
}
const ExpenseItem = (props: Props) => {
  const {itemData, budgetID, removeTempObj, disableSwipe} = props;
  const {deleteExpendedItems, loadingBudget, userBudgetError} = useBudget();
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [modal, setModal] = useState<Element | null>(null);

  useEffect(() => {
    setModal(getModal());
  }, [moreInfo, editInfo, deleteItem]);

  const handleEdit = () => {
    console.log('save');
    setEditInfo(false);
  };

  const typeOfItemObject = (data: any) => {
    return 'type' in data && data.type === 'ItemObject';
  };

  const getModal = () => {
    if (moreInfo) {
      return (
        <ExpenseItemModal
          itemData={itemData}
          editMode={false}
          isVisible={moreInfo}
          cancelButtonPress={() => setMoreInfo(false)}
          cancelButtonText={'Close'}
          description={'More Details About This Item'}
          buttonsLoading={loadingBudget}
          errorMessage={userBudgetError}
        />
      );
    } else if (editInfo) {
      return (
        <ExpenseItemModal
          itemData={itemData}
          editMode={true}
          isVisible={editInfo}
          cancelButtonPress={() => setEditInfo(false)}
          cancelButtonText={'Close'}
          firstButtonPress={handleEdit}
          firstButtonText="Save"
          description={'Edit Details About This Item'}
          buttonsLoading={loadingBudget}
          errorMessage={userBudgetError}
        />
      );
    } else if (deleteItem) {
      return (
        <PopupModal
          description="Are you sure you want to delete this item? Once this item is deleted there is no way to recover it."
          firstButtonPress={() => {
            if (typeOfItemObject(itemData)) {
              const temp = itemData as ItemObject;
              deleteExpendedItems([temp.id], budgetID);
            } else {
              removeTempObj;
            }
          }}
          firstButtonText="Delete"
          cancelButtonPress={() => setDeleteItem(false)}
          cancelButtonText="Cancel"
          isVisible={deleteItem}
          buttonsLoading={loadingBudget}
          errorMessage={userBudgetError}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <ListItem.Swipeable
        rightContent={reset => (
          <>
            {disableSwipe ? (
              <></>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  height: '100%',
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => {
                    reset();
                    setMoreInfo(true);
                  }}
                  icon={{name: 'info', color: 'white'}}
                  buttonStyle={{
                    backgroundColor: 'grey',
                    minHeight: '80%',
                  }}
                />
                <Button
                  onPress={() => {
                    reset();
                    setEditInfo(true);
                  }}
                  icon={{name: 'edit', type: 'font-awesome', color: 'white'}}
                  buttonStyle={{minHeight: '80%'}}
                />
                <Button
                  onPress={() => {
                    reset();
                    setDeleteItem(true);
                  }}
                  icon={{name: 'delete', color: 'white'}}
                  buttonStyle={{
                    backgroundColor: 'red',
                    minHeight: '80%',
                  }}
                />
              </View>
            )}
          </>
        )}
        style={{
          borderBottomColor: theme.lightColors?.grey4,
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            height: '150%',
            padding: 0,
            margin: 0,
            backgroundColor: itemData.category.color,
            width: 5,
            alignSelf: 'center',
          }}>
          <Text> </Text>
        </View>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ListItem.Title>
            <>
              {itemData.name}
              {'   '}
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                  color: theme.lightColors?.grey3,
                }}>
                category: {itemData.category.categoryName}
              </Text>
            </>
          </ListItem.Title>
          <ListItem.Subtitle>$ {itemData.cost}</ListItem.Subtitle>
        </ListItem.Content>
        {disableSwipe ? null : <ListItem.Chevron />}
      </ListItem.Swipeable>
      {modal}
    </>
  );
};

export default ExpenseItem;
