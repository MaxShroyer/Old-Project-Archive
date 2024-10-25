import {Text, makeStyles} from '@rneui/themed';
import React from 'react';

const Error = ({
  error,
  padded = false,
  align = 'left',
  topPadding = 0,
}: {
  error: string;
  padded?: boolean;
  align?: 'left' | 'center';
  topPadding?: number;
}) => {
  const styles = useStyles();
  return (
    <>
      {error && (
        <Text
          style={[
            styles.error,
            padded && styles.padded,
            {textAlign: align, paddingTop: topPadding},
          ]}>
          {error}
        </Text>
      )}
    </>
  );
};

export default Error;
const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 53,
    flexGrow: 1,
  },
  formContainer: {
    marginHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 50,
    flex: 1,
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 15,
    zIndex: 10,
  },
  checkbox: {
    marginHorizontal: 20,
    marginVertical: 0,
    paddingVertical: 0,
  },
  label: {
    color: theme.colors.grey5,
    fontSize: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  servicesContainer: {
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  inputInputContainer: {
    backgroundColor: theme.colors.white,
    marginTop: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  inputContainer: {flexShrink: 1},
  inputLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    paddingHorizontal: 10,
  },
  sliderRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 70,
  },
  sliderMinMax: {
    marginBottom: 0,
  },
  slider: {flexGrow: 1, height: 25},
  sliderThumb: {
    height: 15,
    width: 15,
    backgroundColor: theme.colors.grey5,
  },
  sliderThumbContainer: {
    position: 'absolute',
    top: 35,
    left: '50%',
    width: 80,
    transform: 'translateX(-40px)',

    backgroundColor: theme.colors.grey4,
    paddingVertical: 9,
    borderRadius: 5,
  },
  sliderThumbArrow: {
    position: 'absolute',
    top: -7,
    left: 25,
    width: 30,
    height: 30,
    transform: 'rotate(45deg)',
    backgroundColor: theme.colors.grey4,
  },
  sliderThumbText: {
    color: theme.colors.black,
    textAlign: 'center',
  },
  sliderTrack: {height: 5},
  error: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: theme.colors.grey5,
    alignSelf: 'center',
    paddingHorizontal: 35,
    paddingVertical: 13,
  },
  padded: {
    marginHorizontal: 10,
  },
  shrink: {
    flexShrink: 1,
    flex: 1,
  },
  zIndex: {zIndex: 10},
}));
