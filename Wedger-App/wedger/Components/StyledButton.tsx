import {Button, ButtonProps} from '@rneui/base';
import React from 'react';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 8,
    alignSelf: 'center',
    elevation: 2,
  },
  title: {fontSize: 15, fontWeight: '600', color: theme.colors.white},
}));

function StyledButton(props: ButtonProps) {
  const {buttonStyle, titleStyle, loadingProps, ...rest} = props;
  const styles = useStyles();
  return (
    <Button
      {...rest}
      loadingProps={{color: 'black', ...loadingProps}}
      titleStyle={[styles.title, titleStyle]}
      buttonStyle={[styles.button, buttonStyle]}
    />
  );
}

export default StyledButton;
