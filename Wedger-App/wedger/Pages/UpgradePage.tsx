/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, View} from 'react-native';
import Header from '../Components/Header';
// import SubscriptionButton from '../Components/SubscriptionButton/SubscriptionButton';
import {makeStyles, Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';

const UpgradePage = () => {
  const styles = useStyles();
  const navigator = useNavigation();

  // TODO: fix subscription button so it doesn't break everything
  return (
    <View>
      <LinearGradient
        colors={['#EBF8FE', '#7FB5C1']}
        style={styles.linearGradient}>
        <Header logo paddingTop backButton />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text h2 style={{textAlign: 'center', color: 'black'}}>
              Unlock the full potential of your finances with Wedger+! This
              premium upgrade offers advanced insights into your spending
              habits, helping you identify where your money goes and how you can
              save more effectively.
            </Text>
            {/* <SubscriptionButton /> */}
            <StyledButton
              onPress={() => {
                navigator.navigate('UpgradePage');
                Alert.alert(
                  'sorry no upgrade features are not implemented yet',
                );
              }}>
              Upgrade
            </StyledButton>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UpgradePage;

const useStyles = makeStyles(theme => ({
  container: {height: '90%'},
  linearGradient: {},
  textContainer: {
    backgroundColor: theme.colors.background,
    marginTop: 100,
    marginHorizontal: 20,
    padding: 40,
    borderRadius: 15,
    gap: 40,
  },
}));
