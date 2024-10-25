import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../Components/TextInputField';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../Context/userAuthContext';
import AuthContainer from '../Components/AuthContainer';
import {makeStyles} from '@rneui/themed';
import Error from '../Components/Error';

type SignUpError =
  | 'NoError'
  | 'IncompleteFields'
  | 'PasswordNoMatch'
  | 'InvalidPasswordException'
  | 'UsernameExistsException'
  | 'NameExistsException'
  | 'Other';
export function SignUpPage() {
  const navigator = useNavigation();
  const styles = useStyles();
  const {createEmailAccount, userAuthError} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [errorOptions, setErrorOptions] = useState<{
    underlineEmail?: boolean;
    underlinePassword?: boolean;
    underlineConfirmPassword?: boolean;
    errorMessage?: string;
    underlineName?: boolean;
  }>({});

  const setError = (error: SignUpError, payload?: string) => {
    switch (error) {
      case 'NoError': {
        setErrorOptions({});

        break;
      }
      case 'IncompleteFields': {
        setErrorOptions({
          underlineName: !name,
          underlineEmail: !email,
          underlinePassword: !password,
          underlineConfirmPassword: !confirmPassword,
          errorMessage: 'All fields must be complete to register.',
        });

        break;
      }
      case 'UsernameExistsException': {
        setErrorOptions({
          underlineEmail: true,
          errorMessage: payload,
        });

        break;
      }
      case 'InvalidPasswordException': {
        setErrorOptions({
          underlinePassword: true,
          underlineConfirmPassword: true,
          errorMessage: payload,
        });

        break;
      }
      case 'Other': {
        setErrorOptions({
          errorMessage: `Something went wrong... (${payload})`,
        });

        break;
      }
      case 'PasswordNoMatch': {
        setErrorOptions({
          errorMessage: 'error: passwords do not match',
          underlinePassword: true,
          underlineConfirmPassword: true,
        });
      }
      default: {
        setErrorOptions({
          errorMessage: `Something went wrong... (${payload})`,
        });
      }
    }
  };

  const checkInputs = (): boolean => {
    let isValid = true;
    let newError: SignUpError = 'NoError';

    if (!(email && password && confirmPassword && name)) {
      newError = 'IncompleteFields';
      isValid = false;
      setIsSubmitting(false);
    }

    setError(newError);
    return isValid;
  };

  const handleSighup = async () => {
    setIsSubmitting(true);
    if (checkInputs()) {
      try {
        await createEmailAccount(name, email, password, confirmPassword);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <AuthContainer
      switchPagePlainText="Already have an account? "
      switchPageLinkText="Log in"
      handleSwitchAuthPage={() => navigator.navigate('Login')}>
      <View>
        <View style={styles.buttonContainer}>
        <TextInputField
            placeholder="Name"
            autoComplete="name"
            textContentType="name"
            autoCapitalize="none"
            onChangeText={setName}
            style={errorOptions?.underlineName ? styles.inputError : {}}
          />
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
          <TextInputField
            placeholder="Confirm Password"
            autoComplete="password"
            textContentType="password"
            onChangeText={setConfirmPassword}
            password
            style={
              errorOptions?.underlineConfirmPassword ? styles.inputError : {}
            }
          />
        </View>
        <StyledButton
          onPress={handleSighup}
          containerStyle={styles.buttonContainer}
          loading={isSubmitting}>
          Sign Up
        </StyledButton>
        <Error align="center" topPadding={16} error={errorOptions.errorMessage ? errorOptions.errorMessage : userAuthError} />
      </View>
    </AuthContainer>
  );
}

export default SignUpPage;

const useStyles = makeStyles(theme => ({
  headerText: {
    marginBottom: 25,
  },
  buttonContainer: {
    marginTop: 25,
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
    marginBottom: 35,
  },
  error: {textAlign: 'center', color: theme.colors.error, marginBottom: 5},
  inputError: {
    borderBottomColor: theme.colors.error,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
}));
