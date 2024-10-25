import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
// import SignInOptionButton from '../SignInOptionButton';
import useStyles from './styles';
// import Facebook from '../../assets/images/sso/facebook.svg';
// import Apple from '../../assets/images/sso/apple.svg';
// import Google from '../../assets/images/sso/google.svg';
import {useAuth} from '../Context/userAuthContext';

export default function SignInOptions() {
  //   const styles = useStyles();

  //   const {checkIfLoggedIn} = useAuth();

  //   const handleApplePress = async () => {
  //     console.log('Pressed');
  //     try {
  //       const res = await signInWithRedirect({
  //         provider: 'Apple',
  //         options: {preferPrivateSession: true},
  //       });
  //       console.log('Res: ', res);
  //     } catch (e) {
  //       console.log('Error signing in with Apple: ', e);
  //     }
  //   };

  //   const handleGooglePress = async () => {
  //     console.log('Pressed');
  //     try {
  //       const res = await signInWithRedirect({
  //         provider: 'Google',
  //         options: {preferPrivateSession: true},
  //       });
  //       console.log('Res: ', res);
  //     } catch (e) {
  //       console.log('Error signing in with Apple: ', e);
  //     }
  //   };

  return (
    <View>
      {/* <SignInOptionButton onPress={handleApplePress} svg={<Apple />} />
      <SignInOptionButton onPress={handleGooglePress} svg={<Google />} /> */}
    </View>
  );
}
