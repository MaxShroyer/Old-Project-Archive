import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  // Main
  Tabs: undefined;
  Loading: undefined;
  LoadingPage: undefined;
  Onboarding: undefined;

  //Overview
  OverviewHome: undefined;
  CreateBudgetPage: undefined;

  //Scanner
  ScannerHome: undefined;
  AddExpensePage: {budgetID: string};
  NextStepsPage: undefined;
  //Profile
  ProfileHome: undefined;

  //Shopping List
  ShoppingListHome: undefined;

  //Analytics
  AnalyticsHome: undefined;

  //Subscription
  UpgradePage: undefined;

  //Auth
  Auth: undefined;
  Welcome: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  NextSteps: undefined;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
