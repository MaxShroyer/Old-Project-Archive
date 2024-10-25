import {ColorValue, View} from 'react-native';
import WedgerLogo from '../Assets/Static/Wedger_App_logo.svg';
import React from 'react';
import {makeStyles, Text} from '@rneui/themed';
import BackButton from './BackButton';
import {useNavigation} from '@react-navigation/native';

export interface HeaderProps {
  logo?: boolean;
  title?: string;
  backButton?: boolean;
  explanation?: string;
  moreSpace?: boolean;
  marginTop?: boolean;
  paddingTop?: boolean;
  logoColor?: ColorValue;
}

export function Header({
  logo,
  title,
  explanation,
  moreSpace,
  marginTop,
  backButton,
  paddingTop,
  logoColor,
}: HeaderProps) {
  const styles = useStyles();
  const navigator = useNavigation();

  return (
    <View
      style={[
        styles.container,
        moreSpace && styles.containerPadding,
        marginTop && styles.marginTop,
        paddingTop && styles.paddingTop,
      ]}>
      {backButton && (
        <BackButton
          onPress={() => {
            console.log('back');
            navigator.goBack();
          }}
        />
      )}
      {logo && <WedgerLogo color={logoColor ? logoColor : undefined} />}
      {title && (
        <Text h2 style={[styles.title, moreSpace && styles.titlePadding]}>
          {title}
        </Text>
      )}
      {explanation && <Text style={styles.explanation}>{explanation}</Text>}
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  containerPadding: {
    paddingBottom: 10,
  },
  title: {
    paddingHorizontal: 72,
    textAlign: 'center',
  },
  titlePadding: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  explanation: {
    paddingHorizontal: 48,
  },
  marginTop: {
    marginTop: 200,
  },
  paddingTop: {
    marginTop: 50,
  },
}));

export default Header;
