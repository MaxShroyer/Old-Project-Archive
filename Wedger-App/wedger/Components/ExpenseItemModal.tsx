import {Card} from '@rneui/base';
import {makeStyles, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  addItemObject,
  ItemObject,
  SpendCatagoriesObjectArray,
} from '../Types/BudgetTypes';
import StyledButton from './StyledButton';
import Error from './Error';
import TextInputField from './TextInputField';
import Dropdown from './Dropdown/Dropdown';
import DatePicker from 'react-native-date-picker';

interface Props {
  itemData: ItemObject | addItemObject | undefined;
  editMode: boolean;
  isVisible: boolean;
  cancelButtonPress: () => void;
  cancelButtonText: string;
  firstButtonPress?: (item: addItemObject) => void;
  firstButtonText?: string;
  description: string;
  buttonsLoading: boolean;
  errorMessage: string;
}

export default function ExpenseItemModal(props: Props) {
  const {
    itemData,
    editMode,
    isVisible,
    cancelButtonPress,
    description,
    buttonsLoading,
    cancelButtonText,
    firstButtonPress,
    firstButtonText,
    errorMessage,
  } = props;
  const styles = useStyles();

  const [tempName, setTempName] = useState(itemData?.name ? itemData.name : '');
  const [tempCost, setTempCost] = useState(itemData?.cost ? itemData.cost : 0);
  const [tempQuantity, setTempQuantity] = useState(
    itemData?.quantity ? itemData.quantity : 1,
  );
  const [tempUnitCost, setTempUnitCost] = useState(
    itemData?.unitCost ? itemData.unitCost : 1,
  );
  const [tempDate, setTempDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [tempCategory, setTempCategory] = useState(
    itemData?.category ? itemData.category : SpendCatagoriesObjectArray[0],
  );
  const [tempPaymentType, setTempPaymentType] = useState(
    itemData?.paymentType ? itemData.paymentType : 'cash',
  );
  const [tempAddMethod, setTempAddMethod] = useState(
    itemData?.addMethod ? itemData.addMethod : 'manual',
  );
  const [tempReoccurring, setTempReoccurring] = useState(
    itemData?.Reoccurring ? itemData.Reoccurring : 'never',
  );
  const [tempReceptRef, setTempReceptRef] = useState(
    itemData?.receptRefId ? itemData.receptRefId : '',
  );
  useEffect(() => {
    setTempUnitCost(tempCost / tempQuantity);
  }, [tempQuantity, tempCost]);

  const ObjectBuilder = (): addItemObject => {
    const temp: addItemObject = {
      name: tempName,
      cost: tempCost,
      quantity: tempQuantity,
      unitCost: tempUnitCost,
      date: tempDate,
      category: tempCategory,
      addMethod: tempAddMethod,
      Reoccurring: tempReoccurring,
      receptRefId: tempReceptRef,
    };
    return temp;
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <TouchableOpacity onPress={cancelButtonPress}>
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback>
            <Card containerStyle={styles.card}>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.dataContainer}>
                {editMode ? (
                  <View>
                    <View>
                      <Text h4 style={styles.label}>
                        Item Name
                      </Text>
                      <TextInputField
                        inputStyle={styles.inputStyle}
                        style={styles.content}
                        inputMode="text"
                        defaultValue={tempName}
                        onChangeText={setTempName}
                      />
                      <Text h4 style={styles.label}>
                        Item Cost
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="decimal"
                        defaultValue={tempCost.toString()}
                        onChangeText={e => setTempCost(+e)}
                      />
                      <Text h4 style={styles.label}>
                        Quantity
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="numeric"
                        defaultValue={tempQuantity?.toString()}
                        onChangeText={e => setTempQuantity(+e)}
                      />
                      <Text h4 style={styles.label}>
                        Unit Cost
                      </Text>
                      <Text style={styles.content}>$ {tempUnitCost}</Text>
                      <Text h4 style={styles.label}>
                        Purchase Date
                      </Text>
                      <Button
                        title={dateFormatText(tempDate)}
                        onPress={() => setOpenDatePicker(true)}
                      />
                      <DatePicker
                        modal
                        open={openDatePicker}
                        date={tempDate}
                        onConfirm={date => {
                          setOpenDatePicker(false);
                          setTempDate(date);
                        }}
                        onCancel={() => {
                          setOpenDatePicker(false);
                        }}
                      />

                      <Text h4 style={styles.label}>
                        Category
                      </Text>
                      <Dropdown
                        zIndex={5004}
                        style={styles.content}
                        initialValue={tempCategory.categoryName}
                        onChangeValue={e => {
                          const temp = SpendCatagoriesObjectArray.find(
                            el => e === el.categoryName,
                          );
                          setTempCategory(
                            temp ? temp : SpendCatagoriesObjectArray[0],
                          );
                        }}
                        options={categoryObject}
                      />
                      <Text h4 style={styles.label}>
                        Paid With
                      </Text>
                      <Dropdown
                        zIndex={5003}
                        style={styles.content}
                        initialValue={tempPaymentType.toString()}
                        onChangeValue={e => setTempPaymentType(e)}
                        options={[
                          {value: 'cash', label: 'cash'},
                          {value: 'card', label: 'card'},
                        ]}
                      />

                      <Text h4 style={styles.label}>
                        Item Was Added
                      </Text>
                      <Dropdown
                        zIndex={5002}
                        style={styles.content}
                        initialValue={tempAddMethod.toString()}
                        onChangeValue={setTempAddMethod}
                        options={[
                          {value: 'scanner', label: 'scanner'},
                          {value: 'manual', label: 'manual'},
                        ]}
                      />

                      <Text h4 style={styles.label}>
                        This item is a reoccurring cost that repeats:
                      </Text>
                      <Dropdown
                        zIndex={5001}
                        style={styles.content}
                        initialValue={tempReoccurring}
                        onChangeValue={e => setTempReoccurring(e)}
                        options={[
                          {value: 'never', label: 'never'},
                          {value: 'monthly', label: 'monthly'},
                          {value: 'bi-weekly', label: 'bi-weekly'},
                          {value: 'weekly', label: 'weekly'},
                          {value: 'daily', label: 'daily'},
                        ]}
                      />

                      <Text h4 style={styles.label}>
                        Recept Attachment * not implemented
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="text"
                        defaultValue={tempReceptRef}
                        onChangeText={setTempReceptRef}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text h4 style={styles.label}>
                      Item Name
                    </Text>
                    <Text style={styles.content}>{itemData?.name}</Text>
                    <Text h4 style={styles.label}>
                      Item Cost
                    </Text>
                    <Text style={styles.content}>{itemData?.cost}</Text>
                    <Text h4 style={styles.label}>
                      Quantity
                    </Text>
                    <Text style={styles.content}>{itemData?.quantity}</Text>
                    <Text h4 style={styles.label}>
                      Unit Cost
                    </Text>
                    <Text style={styles.content}>{itemData?.unitCost}</Text>
                    <Text h4 style={styles.label}>
                      Purchase Date
                    </Text>
                    <Text style={styles.content}>
                      {itemData?.date
                        ? itemData?.date.toUTCString()
                        : 'unknown'}
                    </Text>
                    <Text h4 style={styles.label}>
                      Category
                    </Text>
                    <Text style={styles.content}>
                      {itemData?.category
                        ? itemData?.category.categoryName
                        : 'other'}
                    </Text>
                    <Text h4 style={styles.label}>
                      Paid With
                    </Text>
                    <Text style={styles.content}>
                      {itemData?.paymentType
                        ? itemData?.paymentType.toString()
                        : 'unknown'}
                    </Text>
                    <Text h4 style={styles.label}>
                      Item Was Added
                    </Text>
                    <Text style={styles.content}>{itemData?.addMethod}</Text>
                    {itemData?.Reoccurring && (
                      <>
                        <Text h4 style={styles.label}>
                          This item is a reoccurring cost that repeats:
                        </Text>
                        <Text style={styles.content}>
                          {itemData?.Reoccurring}
                        </Text>
                      </>
                    )}
                    <Text h4 style={styles.label}>
                      Recept Attachment
                    </Text>
                    <Text style={styles.content}>{itemData?.receptRefId}</Text>
                  </View>
                )}
              </View>

              <View style={styles.buttonContainer}>
                {cancelButtonPress && (
                  <StyledButton
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    onPress={cancelButtonPress}
                    loading={buttonsLoading}>
                    {cancelButtonText}
                  </StyledButton>
                )}
                {firstButtonPress && (
                  <StyledButton
                    loading={buttonsLoading}
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    loadingProps={{color: 'white'}}
                    onPress={() => {
                      const temp = ObjectBuilder();
                      firstButtonPress(temp);
                    }}>
                    {firstButtonText}
                  </StyledButton>
                )}
              </View>
              {errorMessage && (
                <Error align="center" topPadding={16} error={errorMessage} />
              )}
            </Card>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
}
const categoryObject = SpendCatagoriesObjectArray.map(e => {
  const tempObj = {label: e.categoryName, value: e.categoryName};
  return tempObj;
});

export const dateFormatText = (date: Date) => {
  let dateString = date.toLocaleDateString();
  let dateArray = dateString.split('/');
  // YYYY-MM-DD, not MM-DD-YYYY
  // let day = dateArray[1].padStart(2, '0');
  // let month = dateArray[0].padStart(2, '0');
  // dateArray[0] = dateArray[2];
  // dateArray[1] = month;
  // dateArray[2] = day;

  let newDateString = dateArray.join('-');

  return newDateString;
};

const useStyles = makeStyles(theme => ({
  modal: {},
  container: {width: '100%', height: '80%', marginVertical: '10%'},
  dataContainer: {},
  label: {color: theme.colors.black, fontWeight: 'bold', padding: 3},
  content: {
    color: theme.colors.black,
    paddingLeft: 20,
    paddingBottom: 5,
    fontSize: 14,
  },
  inputStyle: {
    color: theme.colors.black,
    backgroundColor: theme.colors.background,
  },
  background: {backgroundColor: theme.colors.background},
  card: {borderRadius: 20},
  header: {
    textAlign: 'center',
    width: '100%',
  },
  description: {padding: 10, color: theme.colors.black},
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 50,
    gap: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
}));
