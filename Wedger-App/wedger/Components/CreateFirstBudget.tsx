import {View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from './Header';
import {Text, makeStyles} from '@rneui/themed';
import StyledButton from './StyledButton';
import {useNavigation} from '@react-navigation/native';

const CreateFirstBudget = () => {
  const navigator = useNavigation();
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <LinearGradient colors={['#EBF8FE', '#2F88bd']} style={styles.gradient}>
        <Header logo paddingTop />
        <View style={styles.container}>
          <Text h1 style={styles.text}>
            Looks like you dont have any budgets. Lets get you all set up with
            saving!
          </Text>

          <StyledButton
            title={'Create Your First Budget'}
            onPress={() => {
              navigator.navigate('CreateBudgetPage');
            }}></StyledButton>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CreateFirstBudget;

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: 30,
    justifyContent: 'center',
    marginHorizontal: 30,
    borderRadius: 15,
    gap: 30,
  },
  text: {
    color: theme.colors.black,
  },
  root: {
    height: '100%',
    width: '100%',
  },
  gradient: {justifyContent: 'space-evenly', height: '100%'},
}));
