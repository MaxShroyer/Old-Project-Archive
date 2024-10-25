import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GroupName = (props: {text: string}) => {
  return (
    <>
      <View style={styles.group}>
        <View style={styles.groupLeft}>
          <View style={styles.square}></View>
          <Text style={styles.groupNameText}> {props.text} </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#FFFDF7',
    borderColor: '#C0C0C0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  groupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 20,
    marginRight: 15,
  },
  groupNameText: {
    maxWidth: '80%',
    color: 'black',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default GroupName;
