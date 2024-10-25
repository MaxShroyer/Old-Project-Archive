import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';

export function NextStepsPage({route}) {
  const {parsedData} = route.params; // leaving incomplete until I create a custom trained model for parsing (long term goal)
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FE', '#8eb2c0']}
        style={styles.linearGradient}>
        <View style={styles.headerContainer}>
          <Text style={styles.header1}>Preview Expenses</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  header1: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default NextStepsPage;
