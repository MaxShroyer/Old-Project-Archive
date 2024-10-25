import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../Components/TextInputField';
import Dropdown from '../Components/Dropdown/Dropdown';
import ColorPickerModal from '../Components/ColorPickerModal';
import StyledButton from '../Components/StyledButton';
import {useBudget} from '../Context/userBudgetContext';
import {createBudgetType} from '../Types/BudgetTypes';
import {useNavigation} from '@react-navigation/native';
import PopupModal from '../Components/PopupModal';
import LinearGradient from 'react-native-linear-gradient';


interface DropDownOption {
  label: string;
  value: 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

type DropdownValues = 'monthly' | 'weekly' | 'bi-weekly' | 'daily';

const timeFrameBudgetOptions: DropDownOption[] = [
  {label: 'Monthly', value: 'monthly'},
  {label: 'Bi-Weekly', value: 'bi-weekly'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Daily', value: 'daily'},
];

const CreateBudgetPage = () => {
  const {createBudget, loadingBudget} = useBudget();
  const navigator = useNavigation();
  const [budgetName, setBudgetName] = useState<string | undefined>();
  const [spendGoal, setSpendGoal] = useState<number | undefined>();
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [labelColor, setLabelColor] = useState('#561ecb');
  const [timeFrame, setTimeFrame] = useState<DropdownValues>('monthly');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const submitBudget = async () => {
    if (validateInputs()) {
      if (budgetName && spendGoal && labelColor && timeFrame) {
        const budgetObjBuild: createBudgetType = {
          labelColor: labelColor,
          budgetName: budgetName,
          spendTarget: spendGoal,
          timeFrame: timeFrame,
        };
        await createBudget(budgetObjBuild);
        setModalOpen(true);
      }
    }
  };

  const validateInputs = () => {
    //TODO: form validation
    if (budgetName && spendGoal && labelColor && timeFrame) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <LinearGradient
          colors={['#EBF8FE', '#8eb2c0']}
          style={styles.linearGradient}>
    <View>
      <Text style = {styles.header1}>Create New Budget</Text>
      <TextInputField placeholder="Budget Name" onChangeText={setBudgetName} />
      <TextInputField
        placeholder="Budget Amount"
        inputMode="numeric"
        onChangeText={e => setSpendGoal(e as unknown as number)}
      />
      <View style = {styles.selectBox}>
        <StyledButton
          onPress={() => setShowColorPicker(true)}
          buttonStyle={{backgroundColor: labelColor}}>
          Pick A Color For Your Budget
        </StyledButton>
      </View>
      <ColorPickerModal
        showModal={showColorPicker}
        colorHex={labelColor}
        setShowModal={setShowColorPicker}
        onSelectColor={setLabelColor}
      />
      <View>
        <Text style = {styles.header2}>Select the time frame for your budget</Text>
        <Dropdown
          options={timeFrameBudgetOptions}
          initialValue="monthly"
          onChangeValue={value => setTimeFrame(value)}
        />
      </View>
      <View style = {styles.selectBox}>
      <StyledButton onPress={submitBudget} loading={loadingBudget}>
        Start Saving!
      </StyledButton>
      <PopupModal
        isVisible={modalOpen}
        header="YAY!"
        description="Your budget was created! you will now see in on your overview page. Budget info can be edited any time by clicking the budget edit button"
        firstButtonPress={() => {
          setModalOpen(!modalOpen);
          navigator.navigate('OverviewHome');
        }}
        firstButtonText="Continue"
      />
      </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
  header1: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
  },
  header2: {
    marginTop: 8,
    marginBottom: 0,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '600',
  },
  selectBox: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
  },
})

export default CreateBudgetPage;
