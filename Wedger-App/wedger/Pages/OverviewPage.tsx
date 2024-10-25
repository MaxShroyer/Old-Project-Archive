import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledButton from '../Components/StyledButton';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useBudget} from '../Context/userBudgetContext';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import RenderItem from '../Components/RenderItem';
import DonutChart from '../Components/DonutChart';
import {Color, useFont} from '@shopify/react-native-skia';
import CarouselCards from '../Components/Carousel/CarouselCards';
import {BudgetType, ItemObject} from '../Types/BudgetTypes';
import ExpenseItem from '../Components/ExpenseItem';
import CreateFirstBudget from '../Components/CreateFirstBudget';
import PopupModal from '../Components/PopupModal';

interface Slice {
  value: number;
  percentage: number;
  color: string;
}

const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

function OverviewPage() {
  const {usersBudgets} = useBudget();

  return (
    <SafeAreaView style={styles.mainContainer}>
      {usersBudgets.length === 0 ? (
        <CreateFirstBudget />
      ) : (
        <CarouselCards data={[...usersBudgets]} renderItem={OverviewCardItem} />
      )}
    </SafeAreaView>
  );
}
const OverviewCardItem = ({item, index}: any) => {
  return (
    <SafeAreaView style={styles.container} key={index}>
      <OverviewCardComponent budget={item as BudgetType} />
    </SafeAreaView>
  );
};

interface OverviewCardComponentProps {
  budget: BudgetType;
}
const OverviewCardComponent = (props: OverviewCardComponentProps) => {
  const {budget} = props;
  const {getItemsExpended} = useBudget();
  const navigator = useNavigation();
  const [currentDate, setCurrentDate] = useState<string | undefined>();

  const n = 2;
  const font = useFont(require('../Assets/fonts/Roboto-Bold.ttf'), 45);
  const smallFont = useFont(require('../Assets/fonts/Roboto-Light.ttf'), 41);
  const [slice, setSlice] = useState<Slice[] | any>([]);
  const totalSliceValue = useSharedValue(0);
  const totalSliceSpent = useSharedValue(0);
  const deciamls = useSharedValue<number[]>([]);

  const generateSlice = () => {
    const generateSlice = [sliceAmountSpent, sliceTotalBudget];
    const total: number = sliceTotalBudget!;
    const spent: number = sliceAmountSpent!;
    const percentageSpent = (spent / total) * 100;
    const percentageTotal = 100 - percentageSpent;
    const decimalSlice = [percentageTotal / 100, percentageSpent / 100];
    const percentages = [percentageSpent, percentageTotal];
    const revcolors = ['#7FB5C1', budget.labelColor];
    const values = [spent, total - spent]

    const sliceData = generateSlice.map((value, index) => ({
      value: values[index],
      percentage: percentages[index],
      color: revcolors[index],
    }));

    totalSliceValue.value = withTiming(total, {duration: 1000});
    totalSliceSpent.value = withTiming(spent, {duration: 1000});
    deciamls.value = [...decimalSlice];
    setSlice(sliceData);
    };

  const [currentBudgetName, setBudgetName] = useState<string | undefined>('');
  const [sliceTotalBudget, setSliceTotal] = useState<number>(0);
  const [sliceAmountSpent, setSliceSpent] = useState<number>(0);
  const [currentLabelColor, setLabelColor] = useState<string | ColorValue>('#000',);
  const [currentExpenseItems, setCurrentExpenseItems] = useState<ItemObject[]>(
    [],
  );
  const Seperator = () => <View style={seperatorStyles} />;
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);
  const colors = [budget.labelColor, "#7FB5C1"]; //#7FB5C1, #C4D2DF, #2F88bd color for original blue

  useEffect(() => {
    getItems();
    setCurrentDate(GetDate());
    setLabelColor(getLabelColor());
    setBudgetName(getBudgetName());
    setSliceTotal(getTotal());
    setSliceSpent(getAmountSpent());
  }, [budget]);

  useEffect(() => {
    if (sliceTotalBudget && sliceAmountSpent || sliceAmountSpent === 0) generateSlice();
  }, [sliceTotalBudget, sliceAmountSpent, budget, currentExpenseItems]);

  // Have functions inside page function and above return statement
  // Also have valuables that dont have to change on every render, See UseState and UseEffect

  function GetDate() {
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let monthIndex = new Date().getMonth();
    let thisYear = new Date().getFullYear();
    let monthName = monthNames[monthIndex];
    return monthName + ' ' + thisYear;
  }

  function getLabelColor() {
    const labelColor: ColorValue = budget.labelColor;
    if (labelColor == null) {
      return '#1E303C';
    } else {
      return labelColor;
    }
  }

  function getBudgetName() {
    if (budget.budgetName === '') {
      return 'Example Budget (Grocery Shopping)';
    } else {
      const budgetName: string = budget.budgetName;
      return budgetName;
    }
  }

  async function getItems() {
    if (budget.id) {
      await getItemsExpended(budget.id).then(el => setCurrentExpenseItems(el));
    }
  }
  function getTotal() {
    if (budget.spendTarget === 0) {
      return 500;
    } else {
      const total: number = budget.spendTarget;
      return total;
    }
  }
  function getAmountSpent() {
    if (budget.spendCurrent === 0 && budget.spendTarget === 0) {
      return 100;
    } else {
      const spent: number = budget.spendCurrent;
      return spent;
    }
  }
  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FE', '#2F88bd']} //#8eb2c0, #EBF8FE or  budget.labelColor.toString()
        style={styles.linearGradient}>
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.header1}>
              {' '}
              Overview <Text style={styles.header2}>{currentDate}</Text>
            </Text>
            <View style={{alignItems: 'center', margin: 8, marginBottom: 16}}>
              <View style={styles.chartContainer}>
                <DonutChart
                  radius={RADIUS}
                  strokeWidth={STROKE_WIDTH}
                  outerStrokeWidth={OUTER_STROKE_WIDTH}
                  font={font}
                  smallFont={smallFont}
                  totalValue={totalSliceValue}
                  totalSpent={totalSliceSpent}
                  n={n}
                  gap={GAP}
                  decimals={deciamls}
                  colors={colors}
                />
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                marginTop: 0,
                marginBottom: 8,
                textAlign: 'center',
                fontSize: 36,
                fontWeight: 'bold',
              }}>
              {currentBudgetName}
            </Text>
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                marginBottom: 8,
                paddingBottom: 8,
                paddingTop: 8,
              }}>
              {slice.map((item: any, index: any) => {
                return <RenderItem item={item} index={index} key={index} />;
              })}

              <StyledButton
                onPress={() => {
                  navigator.navigate('CreateBudgetPage');
                }}>
                Create New Budget
              </StyledButton>
            </View>
          </View>
          {/* <View style={styles.amountBox}>
              <Text style={styles.header3}>Amount Left</Text>
              <Seperator />
              <Text style={styles.text}>
                ${currentAmountLeft}/$
                {sliceTotalBudget}
                <View style={styles.amountLeftChart}></View>
              </Text>
            </View> */}
          <View style={styles.addExpense}>
            <Text style={styles.header2}>Add New Expense</Text>
            <StyledButton
              onPress={() => {
                setExpenseModalOpen(true);
              }}>
              Add Expense
            </StyledButton>
          </View>
          <View style={styles.pastExpenses}>
            <Text style={styles.header3}>Past Expenses</Text>
            <Seperator />
            <ScrollView style={{overflow: 'scroll', height: 200}}>
              {currentExpenseItems.length !== 0 &&
                currentExpenseItems.map(item => {
                  return (
                    <ExpenseItem
                      itemData={item}
                      budgetID={budget.id}
                      disableSwipe={true}
                    />
                  );
                })}
            </ScrollView>
          </View>

          <PopupModal
            isVisible={expenseModalOpen}
            description={`Add an expense with budget id ${budget.id}` }
            firstButtonPress={() => {
              setExpenseModalOpen(false);
              navigator.navigate('ScannerHome');
            }}
            firstButtonText="Scanner"
            secondButtonPress={() => {
              setExpenseModalOpen(false);
              navigator.navigate('AddExpensePage', {budgetID: budget.id});
            }}
            secondButtonText="Manually"
            cancelButtonPress={() => setExpenseModalOpen(false)}
            cancelButtonText="Cancel"
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export const SLIDER_WIDTH = Dimensions.get('window').width + 200;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  ScrollView: {
    marginHorizontal: 0,
  },
  button: {
    backgroundColor: '#EBF8FE',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  createBudgetButton: {
    paddingBottom: 8,
    position: 'absolute',
    marginTop: '157%',
    marginLeft: '22%',
  },
  colorContainer: {
    backgroundColor: '#f4f7fc', //#EBF8FE or #f4f7fc
    paddingVertical: 6,
    marginBottom: 6,
    borderRadius: 20,
  },
  colorBoxes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  header1: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
    color: 'black',
  },
  header2: {
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  header3: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: '3%',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },

  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
  budgetBox: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: '#8E8D95', // #1E303C black border hex code
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 650,
    overflow: 'hidden',
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 8,
  },
  pieChart: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#1E303C',
  },
  amountBox: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: '#2F88bd',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 150,
  },
  addExpense: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderColor: '#8eb2c0',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 100,
  },
  pastExpenses: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderColor: '#8eb2c0',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 300,
    overflow: 'scroll',
  },
});
const seperatorStyles: ViewStyle = {
  height: 2,
  width: '100%',
  backgroundColor: '#8E8D95',
};

export default OverviewPage;
