import {ScrollView, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useOnboarding} from '../api/hooks/useOnboarding';
import Header from '../Components/Header';
import {Text, makeStyles} from '@rneui/themed';
import StyledButton from '../Components/StyledButton';

export default function WelcomePage() {
  const navigation = useNavigation();
  const styles = useStyles();

  const {hasSeenOnboarding} = useOnboarding();

  useEffect(() => {
    if (hasSeenOnboarding) {
      navigation.navigate('Login');
    }
  }, [hasSeenOnboarding, navigation]);

  return hasSeenOnboarding ? null : (
    <ScrollView>
      <Header logo moreSpace marginTop />
      <View style={styles.root}>
        <Text style={styles.dividerText}>
          Making Tracking spending in your everyday life a breeze
        </Text>
        <View style={styles.buttonContainer}>
          <StyledButton
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            containerStyle={styles.buttonContainer}>
            Register Now
          </StyledButton>
        </View>
      </View>
    </ScrollView>
  );
}
const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.colors.background,
  },
  root: {
    marginHorizontal: 30,
    marginBottom: 41,
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  featuresContainer: {
    marginTop: 22,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 23,
  },
  buttonContainer: {
    marginTop: 34,
    display: 'flex',
    flexDirection: 'column',
    // rowGap: 25,
    alignItems: 'center',
  },
  dividerText: {
    marginVertical: 12,
    color: theme.colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
}));
