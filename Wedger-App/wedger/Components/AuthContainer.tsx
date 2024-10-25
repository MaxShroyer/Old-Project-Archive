import {makeStyles, Text} from '@rneui/themed';
import React, {ReactNode} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import DividerWithLabel from './DividerWithLabel';
import SignInOptions from './SignInOptions';
import Header from './Header';

interface Props {
  children?: ReactNode;
  switchPagePlainText: string;
  switchPageLinkText: string;
  handleSwitchAuthPage: () => void;
}

export default function AuthContainer({
  children,
  switchPagePlainText,
  switchPageLinkText,
  handleSwitchAuthPage,
}: Props) {
  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Header logo moreSpace marginTop />
      <View style={{paddingHorizontal: 45}}>
        {children}
        <DividerWithLabel containerStyle={styles.dividerContainer}>
          <Text style={styles.dividerLabel}>Or Continue With</Text>
        </DividerWithLabel>
        <SignInOptions />
        <View style={styles.switchPageContainer}>
          <Text style={styles.switchPageText}>{switchPagePlainText}</Text>
          <TouchableOpacity onPress={handleSwitchAuthPage}>
            <Text style={styles.linkText}>{switchPageLinkText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 53,
  },
  dividerLabel: {
    color: theme.colors.black,
    fontSize: 15,
    marginHorizontal: 15,
  },
  dividerContainer: {
    marginTop: 41,
    marginBottom: 37,
  },
  switchPageContainer: {
    marginTop: 37,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchPageText: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.colors.black,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
}));
