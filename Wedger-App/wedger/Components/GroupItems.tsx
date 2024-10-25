/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactNode, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, ListItem} from '@rneui/themed';
import PopupModal from './PopupModal';
import {useShoppingList} from '../Context/userShoppingListContext';
import {ListItemObject, addListItemObject} from '../Types/ShoppingListTypes';

interface Props {
  text: ReactNode;
  itemData: ListItemObject | addListItemObject;
  itemID: string;
  disableSwipe?: boolean;
  removeTempObj?: () => void;
}
const GroupItem = (props: Props) => {
  const {itemData, itemID} = props;
  const {deleteListItems, loadingShoppingList, userShoppingListError} =
    useShoppingList();
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [modal, setModal] = useState<Element | null>(null);

  useEffect(() => {
    setModal(getModal());
  }, [deleteItem]);

  const getModal = () => {
    if (deleteItem) {
      return (
        <PopupModal
          description="Are you sure you want to delete this item? Once this item is deleted there is no way to recover it."
          firstButtonPress={() => {
            const temp = itemData as ListItemObject;
            deleteListItems(temp.id, itemID);
            setDeleteItem(false);
            console.log('item deleted');
          }}
          firstButtonText="Delete"
          cancelButtonPress={() => setDeleteItem(false)}
          cancelButtonText="Cancel"
          isVisible={deleteItem}
          buttonsLoading={loadingShoppingList}
          errorMessage={userShoppingListError}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <ListItem.Swipeable
        rightContent={reset => {
          return (
            <>
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
            </>
          );
        }}
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#C0C0C0',
          padding: 15,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemNameText}> {props.text} </Text>
        </View>
      </ListItem.Swipeable>
      {modal}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C0C0C0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#F69286',
    opacity: 0.4,
    borderRadius: 20,
    marginRight: 15,
  },
  itemNameText: {
    maxWidth: '80%',
    color: 'black',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default GroupItem;
