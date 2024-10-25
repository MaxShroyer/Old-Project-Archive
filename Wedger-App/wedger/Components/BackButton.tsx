import React from 'react';
// import RoundedButton from '../RoundedButton';
import {ButtonProps, Icon} from '@rneui/themed';

export default function BackButton({onPress}: ButtonProps) {
  const styles = useStyles();

  return (
    <Icon
      name="arrow-back-ios"
      type="MaterialIcons"
      containerStyle={styles.icon}
      onPress={onPress}
    />
  );
}

import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  container: {
    width: 35,
    height: 35,
    borderRadius: 20,
    // backgroundColor: "#D9D9D9",
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: '45%',
  },
  iconColor: {color: theme.colors.primary},
}));
