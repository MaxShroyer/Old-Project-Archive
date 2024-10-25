import '@rneui/themed';
import {createTheme} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#26abff',
    secondary: '#FAF9F6',
    background: '#FAF9F6',
    white: '#ffffff',
    black: '#000000',
    success: '#44DD5C',
    searchBg: 'white',
  },
  darkColors: {
    background: '#161618',
    white: '#ffffff',
    black: '#000000',
    divider: '#D9D9D9',
    grey5: '#fcfcfc',
    grey4: '#D9D9D9',
    grey3: '#8F8F8F',
    grey2: '#7B7B7B',
    grey1: '#4E4E4E',
    success: '#44DD5C',
  },
  mode: 'light',
  components: {
    Text: {
      // body text
      style: {
        color: '#fcfcfc',
        fontSize: 15,
        fontWeight: '400',
      },
      // display text ("ELLEM" in the designs)
      h1Style: {
        fontSize: 25,
        fontWeight: '600',
      },
      // page headers + some section headers
      h2Style: {
        fontSize: 20,
        fontWeight: '600',
      },
      // form label, service avatar, divider with label
      h3Style: {
        fontSize: 16,
        fontWeight: '600',
      },
      // button label
      h4Style: {
        fontSize: 15,
        fontWeight: '500',
      },
    },
  },
});

export default theme;
