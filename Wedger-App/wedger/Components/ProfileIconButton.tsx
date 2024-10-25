import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

interface IconButtonProps {
  onPress: () => void;
  iconName: string;
  iconSize: number;
  iconColor: string;
  text: string;
}

export const AntIcon: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 40,
  iconColor = '#000',
  text,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <AntDesign name={iconName} size={iconSize} color={iconColor} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity> // changed this to styled button component
  );
};

export const EntypoIcon: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 40,
  iconColor = '#000',
  text,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Entypo name={iconName} size={iconSize} color={iconColor} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const FeatherIcon: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 40,
  iconColor = '#000',
  text,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Feather name={iconName} size={iconSize} color={iconColor} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F4DCD0',
    borderRadius: 10,
    paddingHorizontal: 120,
    paddingVertical: 10,
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 30,
    fontSize: 20,
  },
});
