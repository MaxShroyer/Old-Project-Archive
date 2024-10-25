import {SafeAreaView, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {addItemObject} from '../Types/BudgetTypes';
import {Icon, makeStyles} from '@rneui/themed';
import ExpenseItem from '../Components/ExpenseItem';
import ExpenseItemModal from '../Components/ExpenseItemModal';
import {useBudget} from '../Context/userBudgetContext';
import StyledButton from '../Components/StyledButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import Error from '../Components/Error';
import {RootStackParamList} from '../Types/RootStackParamList';

const AddExpensePage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const params = route.params as RootStackParamList['AddExpensePage'];
  const styles = useStyles();
  const [expenseList, setExpedienceList] = useState<addItemObject[]>([]);
  const [addItem, setAddItem] = useState<boolean>(false);
  const {loadingBudget, userBudgetError, addExpendedItems} = useBudget();
  
  const handleRemoveItem = (i: number) => {
    let tempArr = expenseList;
    tempArr.splice(i, 1);
    setExpedienceList(tempArr);
  };

  const AddTempExpenseItem = (item: addItemObject) => {
    let tempArr = expenseList;
    tempArr.push(item);
    setExpedienceList(tempArr);
    setAddItem(false);
  };

  const handleAddItems = () => {
    if (expenseList.length !== 0) {
      addExpendedItems(expenseList, params.budgetID);
      setExpedienceList([]);
      navigator.navigate('OverviewHome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.addIcon}>
          <Icon
            name="plus"
            type="entypo"
            color="#000"
            onPress={() => {
              setAddItem(true);
            }}
          />
        </View>
        <ScrollView style={styles.itemContainer}>
          {expenseList.length !== 0
            ? expenseList.map((item, index) => {
                return (
                  <ExpenseItem
                    itemData={item}
                    budgetID={params.budgetID}
                    removeTempObj={() => handleRemoveItem(index)}
                    key={index}
                  />
                );
              })
            : null}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <StyledButton
            buttonStyle={styles.button}
            titleStyle={styles.button}
            onPress={() => navigator.navigate('OverviewHome')}>
            cancel
          </StyledButton>
          <StyledButton
            loading={loadingBudget}
            disabled={expenseList.length === 0}
            buttonStyle={styles.button}
            titleStyle={styles.button}
            loadingProps={{color: 'white'}}
            onPress={() => {
              handleAddItems();
            }}>
            Add expenses to your Budget
          </StyledButton>
        </View>
        {userBudgetError && (
          <Error align="center" topPadding={16} error={userBudgetError} />
        )}
        {addItem && (
          <ExpenseItemModal
            itemData={undefined}
            editMode={true}
            isVisible={addItem}
            cancelButtonPress={() => setAddItem(false)}
            cancelButtonText={'Close'}
            firstButtonPress={AddTempExpenseItem}
            firstButtonText="Add Item"
            description={'Add a new item'}
            buttonsLoading={loadingBudget}
            errorMessage={userBudgetError}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddExpensePage;

const useStyles = makeStyles(theme => ({
  addIcon: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: theme.colors.black,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
    paddingVertical: 20,
  },
  button: {},
  container: {
    height: '100%',
  },
  itemContainer: {minHeight: '50%'},
}));
