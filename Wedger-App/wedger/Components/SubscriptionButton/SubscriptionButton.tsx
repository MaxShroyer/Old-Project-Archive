import {View, Pressable} from 'react-native';
import React from 'react';
import {makeStyles, Text} from '@rneui/themed';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const SubscriptionButton = () => {
  const navigator = useNavigation();
  const styles = useStyles();
  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigator.navigate('UpgradePage');
          }}>
          <View style={styles.dotContainer}>
            <View style={styles.element00} />
            <View style={styles.element01} />
            <View style={styles.element02} />
            <View style={styles.element03} />
            <View style={styles.element04} />
            <View style={styles.element05} />
            <View style={styles.element06} />
            <View style={styles.element07} />
          </View>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor="white"
          />
          <Text h1 style={styles.buttonText}>
            Upgrade to Wedger +
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SubscriptionButton;

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ffdf00', //ffdf00 , FFF6D3
    elevation: 2,
    borderWidth: 4,
    borderRadius: 15,
    backgroundColor: '#50ADF4',
    overflow: 'hidden',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {fontSize: 15, fontWeight: '600', color: theme.colors.white},
  buttonText: {
    position: 'absolute',
    top: 21,
    alignSelf: 'center',
    color: theme.colors.black,
    fontWeight: 'bold',
  },
  plus: {
    position: 'absolute',
    top: 21,
    alignSelf: 'center',
    color: theme.colors.black,
    fontWeight: 'bold',
  },
  element00: {
    height: 80,
    width: 80,
    top: 10,
    backgroundColor: '#F46B50',
    borderRadius: 50,
  },
  element01: {
    height: 80,
    width: 80,
    right: 20,
    backgroundColor: '#A250F4',
    bottom: 40,
    borderRadius: 50,
  },
  element02: {
    height: 80,
    width: 80,
    top: 0,
    right: 60,
    backgroundColor: '#F4D850',
    borderRadius: 50,
  },
  element03: {
    height: 80,
    width: 80,
    right: 80,
    backgroundColor: '#F4D850',
    bottom: 40,
    borderRadius: 50,
  },
  element04: {
    height: 80,
    width: 80,
    right: 100,
    backgroundColor: '#CDFBFF',
    bottom: 0,
    top: 10,
    borderRadius: 50,
  },
  element05: {
    height: 80,
    width: 80,
    right: 150,
    backgroundColor: '#A250F4',
    bottom: 40,
    borderRadius: 50,
  },
  element06: {
    height: 80,
    width: 80,
    right: 200,
    backgroundColor: '#F4D850',
    bottom: 0,
    borderRadius: 50,
  },
  element07: {
    height: 80,
    width: 80,
    right: 20,
    backgroundColor: '#A250F4',
    bottom: 40,
    borderRadius: 50,
  },
}));
