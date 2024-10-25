/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OverviewPage from './Pages/OverviewPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './Types/RootStackParamList';
import {LoadingPage} from './Pages/LoadingPage';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import SignUpPage from './Pages/SignUpPage';
import NextStepsPage from './Pages/NextStepsPage';
import {Icon} from '@rneui/base';
import customTheme from './theme';
import ProfilePage from './Pages/ProfilePage';
import AnalyticsPage from './Pages/AnalyticsPage';
import ImageScannerPage from './Pages/ImageScannerPage';
import ShoppingListPage from './Pages/ShoppingListPage';
import {AuthProvider, useAuth} from './Context/userAuthContext';
import {BudgetProvider, useBudget} from './Context/userBudgetContext';
import {User} from 'firebase/auth';
import UpgradePage from './Pages/UpgradePage';
import {View} from 'react-native';
import CreateBudgetPage from './Pages/CreateBudgetPage';
import AddExpensePage from './Pages/AddExpensePage';
import {ShoppingListProvider} from './Context/userShoppingListContext';
import {decode} from 'base-64';
(global as any).atob = decode; // base 64 decode param, will not be needed after fb storage refactoring

const ContentStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();
const defaultScreenOptions = {
  headerShown: false,
};

function OverviewScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="OverviewHome" component={OverviewPage} />
      <ContentStack.Screen
        name="CreateBudgetPage"
        component={CreateBudgetPage}
      />
    </ContentStack.Navigator>
  );
}
function ShoppingListScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen
        name="ShoppingListHome"
        component={ShoppingListPage}
      />
    </ContentStack.Navigator>
  );
}
function ScannerScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="ScannerHome" component={ImageScannerPage} />
      <ContentStack.Screen name="NextSteps" component={NextStepsPage} />
      <ContentStack.Screen name="AddExpensePage" component={AddExpensePage} />
    </ContentStack.Navigator>
  );
}
function AnalyticsScreen() {
  return (
    // subscription show page else call to action to subscribe
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="AnalyticsHome" component={AnalyticsPage} />
    </ContentStack.Navigator>
  );
}
function ProfileScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="ProfileHome" component={ProfilePage} />
    </ContentStack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="LoadingPage" component={LoadingPage} />
    </ContentStack.Navigator>
  );
}

function UpgradeSubscriptionScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="UpgradePage" component={UpgradePage} />
    </ContentStack.Navigator>
  );
}

function TabsScreen() {
  const {userData} = useAuth();
  const {theme} = useTheme();
  return (
    <Tabs.Navigator
      initialRouteName="OverviewTab"
      screenOptions={{
        lazy: false,
        headerShown: false,
        tabBarActiveTintColor: theme.colors.grey5,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveTintColor: theme.colors.grey5,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          shadowOffset: {width: 0, height: -10},
          shadowRadius: 10,
          shadowOpacity: 0.1,
          elevation: 1,
          borderTopWidth: 1,
          borderColor: theme.colors.grey5,
          paddingBottom: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          position: 'relative',
          bottom: 4,
        },
      }}>
      <Tabs.Screen
        name="OverviewTab"
        component={OverviewScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Overview',
          tabBarIcon: ({focused}) => (
            <Icon
              name="view-dashboard"
              type="material-community"
              color={focused ? theme.colors.primary : theme.colors.grey2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ShoppingListTab"
        component={ShoppingListScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'ShoppingList',
          tabBarIcon: ({focused}) => (
            <Icon
              name="list"
              type="font-awesome-5"
              color={focused ? theme.colors.primary : theme.colors.grey2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ScannerTab"
        component={ScannerScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Scanner',
          tabBarIcon: ({focused}) => (
            <Icon
              name="scan1"
              type="antdesign"
              color={focused ? theme.colors.primary : theme.colors.grey2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AnalyticsTab"
        component={
          userData && userData.subscription === 'paid'
            ? AnalyticsScreen
            : UpgradeSubscriptionScreen
        }
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Analytics',
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative', overflow: 'visible'}}>
              <Icon
                name="analytics"
                type="ionicon"
                color={focused ? theme.colors.primary : theme.colors.grey2}
              />
              {userData && userData.subscription !== 'paid' ? (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    position: 'absolute',
                    right: -8,
                    top: -3,
                    overflow: 'visible',
                  }}>
                  <Icon
                    name="sparkles-sharp"
                    type="ionicon"
                    color="gold"
                    size={15}
                  />
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              type="font-awesome"
              color={focused ? theme.colors.primary : theme.colors.grey2}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function AuthScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="Welcome" component={WelcomePage} />
      <ContentStack.Screen name="Login" component={LoginPage} />
      <ContentStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPage}
      />
      <ContentStack.Screen name="SignUp" component={SignUpPage} />
    </ContentStack.Navigator>
  );
}

function Navigator() {
  const {isLoggedIn, userRef, loadingAuth, userData} = useAuth();
  const {loadingBudget, usersBudgets} = useBudget();
  const getScreen = () => {
    if (
      (loadingBudget && usersBudgets.length === 0) ||
      (loadingAuth && userRef === undefined)
    ) {
      return <ContentStack.Screen name="Loading" component={LoadingScreen} />;
    }

    if (!isLoggedIn) {
      return <ContentStack.Screen name="Auth" component={AuthScreen} />;
    }

    return <ContentStack.Screen name="Tabs" component={TabsScreen} />;
  };

  return (
    <ContentStack.Navigator
      screenOptions={{...defaultScreenOptions, gestureEnabled: false}}>
      {getScreen()}
    </ContentStack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <BudgetProvider>
          <ShoppingListProvider>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </ShoppingListProvider>
        </BudgetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
