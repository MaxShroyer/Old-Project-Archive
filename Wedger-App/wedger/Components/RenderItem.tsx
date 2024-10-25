import {
  ColorValue,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

interface Slice {
  value: number;
  percentage: number;
  color: string;
}

type Props = {
  item: Slice;
  index: number;
};

const List: string[] = ['Amount Spent', 'Amount Left'];

const RenderItem = ({item, index}: Props) => {

  const {width} = useWindowDimensions();
  return (
    <Animated.View
      style={[styles.container, {width: width * 0.9}]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}>
      <View style={styles.contentContainer}>
        <View
          style={[styles.color, {backgroundColor: item.color, marginTop: 8, alignItems: 'center'}]}
        />
        <Text style={styles.text}>{List[index]}:</Text>
        <Text style={styles.text}>{item.percentage.toFixed()}%</Text>
        <Text style={styles.text}>${item.value}</Text>
      </View>
    </Animated.View>
  );
};
export default RenderItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
