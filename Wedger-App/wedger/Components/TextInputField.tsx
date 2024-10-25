import React, {useState} from 'react';
import {Input, InputProps, useTheme} from '@rneui/themed';
import {makeStyles} from '@rneui/themed';

interface TextInputFieldProps extends InputProps {
  password?: boolean;
}

export default function TextInputField({
  labelStyle,
  containerStyle,
  inputContainerStyle,
  errorStyle,
  rightIconContainerStyle,
  rightIcon,
  password,
  ...rest
}: TextInputFieldProps) {
  const styles = useStyles();
  const {theme} = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...rest}
      placeholderTextColor={theme.colors.grey3}
      labelStyle={[styles.labelStyle, labelStyle]}
      inputStyle={[styles.inputStyle]}
      containerStyle={[styles.containerStyle, containerStyle]}
      inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
      errorStyle={[styles.errorStyle, errorStyle]}
      renderErrorMessage={false}
      rightIconContainerStyle={[
        styles.rightIconContainerStyle,
        rightIconContainerStyle,
      ]}
      rightIcon={
        password
          ? {
              type: 'feather',
              name: showPassword ? 'eye-off' : 'eye',
              color: theme.colors.grey3,
              onPress: () => setShowPassword(!showPassword),
            }
          : rightIcon
      }
      secureTextEntry={password && !showPassword}
    />
  );
}

const useStyles = makeStyles(theme => ({
  inputContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme.colors.background,
    borderRadius: 15,
    borderColor: theme.colors.greyOutline,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  rightIconContainerStyle: {marginVertical: -4},
  labelStyle: {
    color: theme.colors.grey5,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputStyle: {fontSize: 15, paddingVertical: 0},
  containerStyle: {
    flexShrink: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  errorStyle: {color: theme.colors.error, marginTop: 5},
}));
