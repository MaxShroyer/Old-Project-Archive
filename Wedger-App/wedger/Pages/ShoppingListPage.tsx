/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useShoppingList} from '../Context/userShoppingListContext';
import GroupName from '../Components/GroupName';
import GroupItem from '../Components/GroupItems';
import {
  addListItemObject,
  createShoppingListType,
} from '../Types/ShoppingListTypes';
import Error from '../Components/Error';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function ShoppingListPage() {
  const {
    createShoppingList,
    userShoppingListError,
    addListItems,
    get_UsersShoppingLists,
  } = useShoppingList();
  const [groupName, setGroupName] = useState('');
  const [text, setText] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [shoppingListArray, setShoppingListArray] = useState<
    createShoppingListType[]
  >([]);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const fetchedLists = await get_UsersShoppingLists();
        setShoppingListArray(fetchedLists); // Update the state with the fetched lists
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      }
    };

    fetchShoppingLists();
  }, []);

  // Adds a group
  const handleAddGroup = async (item: string) => {
    Keyboard.dismiss();
    const val: createShoppingListType = {
      listName: item,
      itemsArray: [],
    };
    const result = await createShoppingList(val);
    if (result) {
      setShoppingListArray(prev => [...prev, {...val, id: result.id}]);
      setGroupName('');
    }
  };

  // Adds an item to the currently open group
  const handleAddItem = async (item: string, list: createShoppingListType) => {
    Keyboard.dismiss();
    let temp = [...shoppingListArray];
    const val: addListItemObject = {
      itemName: item,
      checked: false,
      id: '',
    };
    const index = temp.findIndex(l => l.id === list.id); // Make sure to match by ID, or the intended identifier
    if (index !== -1) {
      temp[index].itemsArray.push(val);
      setShoppingListArray(temp);
      if (list.id) {
        await addListItems([val], list.id); // Assuming this updates Firestore
      }
    }
  };

  const toggleGroup = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <LinearGradient
      colors={['#F6FBFD', '#5C8498']}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text style={styles.title}>Your Shopping Lists</Text>

          {[...shoppingListArray].map((list, index: number) => {
            return (
              <>
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.group,
                    openIndex === index ? {height: 'auto'} : {height: 55},
                  ]}
                  onPress={() => toggleGroup(index)}
                  activeOpacity={1}>
                  <GroupName text={list.listName} />
                </TouchableOpacity>
                {openIndex === index && list.itemsArray && (
                  <>
                    <View style={styles.itemContainer}>
                      {list.itemsArray.map(item => {
                        return (
                          <GroupItem
                            key={item.id}
                            text={item.itemName}
                            itemData={item}
                            itemID={item.id}
                          />
                        );
                      })}
                    </View>
                    <View style={styles.container}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.writeItemWrapper}>
                        <TextInput
                          maxLength={20}
                          style={styles.inputItem}
                          placeholder={'Add an Item!'}
                          value={text}
                          onChangeText={text => setText(text)}
                        />
                        <TouchableOpacity
                          onPress={() => handleAddItem(text, list)}>
                          <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                          </View>
                        </TouchableOpacity>
                      </KeyboardAvoidingView>
                    </View>
                  </>
                )}
              </>
            );
          })}
        </View>
        {/* Make a group section */}
      </ScrollView>

      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeGroupWrapper}>
          <TextInput
            maxLength={20}
            style={styles.input}
            placeholder={'Create a Group!'}
            value={groupName}
            onChangeText={e => setGroupName(e)}
          />
          <TouchableOpacity onPress={() => handleAddGroup(groupName)}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {userShoppingListError && <Error error={userShoppingListError} />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
  },
  group: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#CCE1EC',
    borderRadius: 10,
  },
  title: {
    borderColor: '#20232a',
    color: '#2D373C',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 35,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
  itemContainer: {
    paddingBottom: 30,
  },
  writeGroupWrapper: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    width: 250,
    marginLeft: 30,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 40,
    alignContent: 'center',
  },
  writeItemWrapper: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    width: 250,
    marginLeft: 30,
  },
  varelaRound: {
    fontFamily: 'varelaRound-Regular',
    fontSize: 18,
  },
  closeTheIntroBoxButtonContainer: {
    alignSelf: 'flex-end',
    height: 25,
    width: 25,
    marginRight: 5,
    paddingVertical: 5,
  },
  introBox: {
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});

export default ShoppingListPage;
