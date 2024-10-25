/* eslint-disable no-catch-shadow */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../Components/TextInputField';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../Context/userAuthContext';
import AuthContainer from '../Components/AuthContainer';
import {makeStyles} from '@rneui/themed';
import Error from '../Components/Error';
type LoginError =
  | 'NoError'
  | 'UserNotFoundException'
  | 'NotAuthorizedException'
  | 'IncompleteLoginFields'
  | 'PasswordReset'
  | 'Other';

export function LoginPage() {
  const styles = useStyles();
  const navigator = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {loginWithEmail, userAuthError} = useAuth();

  const [errorOptions, setErrorOptions] = useState<{
    underlineEmail?: boolean;
    underlinePassword?: boolean;
    errorMessage?: string;
  }>({});

  const checkInputs = (): boolean => {
    let isValid = true;
    let newError: LoginError = 'NoError';

    if (!(email && password)) {
      newError = 'IncompleteLoginFields';
      isValid = false;
    }

    setLoginError(newError);
    return isValid;
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    if (checkInputs()) {
      try {
        await loginWithEmail(email, password);
      } catch (e) {
        setLoginError(userAuthError);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrorOptions({
        underlineEmail: !email,
        underlinePassword: !password,
        errorMessage: 'All fields must be complete to register.',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <AuthContainer
      switchPagePlainText="Don't have an account? "
      switchPageLinkText="Register"
      handleSwitchAuthPage={() => navigator.navigate('SignUp')}>
      <View>
        <View style={styles.buttonContainer}>
          <TextInputField
            placeholder="Email"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            style={errorOptions?.underlineEmail ? styles.inputError : {}}
          />
          <TextInputField
            placeholder="Password"
            autoComplete="password"
            textContentType="password"
            onChangeText={setPassword}
            password
            style={errorOptions?.underlinePassword ? styles.inputError : {}}
          />
        </View>
        <StyledButton onPress={handleLogin} loading={isSubmitting} containerStyle={styles.buttonContainer}>
          Login
        </StyledButton>
        <TouchableOpacity onPress={() => navigator.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot your password? </Text>
        </TouchableOpacity>
      </View>
      <Error
        align="center"
        topPadding={16}
        error={loginError ? loginError : userAuthError}
      />
    </AuthContainer>
  );
}

export default LoginPage;

const useStyles = makeStyles(theme => ({
  headerText: {
    marginBottom: 25,
  },
  buttonContainer: {
    marginTop: 25,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: theme.colors.grey3,
    marginTop: 35,
    textAlign: 'center',
    width: '100%',
    textDecorationLine: 'underline',

  },
  linkText: {
    fontSize: 13,
    color: theme.colors.grey5,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 15,
    marginBottom: 5,
  },
  error: {textAlign: 'center', color: theme.colors.error, marginBottom: 5},
  inputError: {
    borderBottomColor: theme.colors.error,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
}));
