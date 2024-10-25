import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(theme => ({
  dropdown: {borderRadius: 15, backgroundColor: theme.colors.background},
  container: {flexShrink: 1, padding: 0, margin: 0},
  dropdownContainer: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 0,
  },
  labelStyle: {paddingLeft: 5},
}));

export default useStyles;
