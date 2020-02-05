import { ThemeType, ThemeInterface } from 'utils/interfaces';
import { RecursivePartial } from 'utils/helpers';

const defaultType = ThemeType.LIGHT;

const defaultFonts = {
  header: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
  },
  subheader: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
  },
  paragraph: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '400',
  },
};

const defaultColors = {
  text: {
    paragraph: '#7A7D92',
    header: '#2A2C3E',
    alternative: '#F8FAFD',
  },
  background: {
    app: '#EAEEF6',
    default: '#F8FAFD',
    alternative: '#F85705',
  },
};

export const defaultTheme: ThemeInterface = {
  type: defaultType,
  fonts: defaultFonts,
  colors: defaultColors,

  // Old properties

  color: {
    basic: '#D3D3D3',
    primary: '#3EC2E9',
    dark: '#0F1C21',
    headerBackground: '#009688',
    light: '#FFFFFF',
    error: '#FF0000',
    errorBackground: 'rgba(255, 0, 0, .2)',
    successBackground: 'rgba(0, 255, 0, .2)',
    background: {
      primary: 'white',
      alternative: 'black',
    },
    font: {
      primary: 'black',
      alternative: 'white',
    },
    link: {
      primary: 'deepskyblue',
      hover: 'lightskyblue',
    },
  },
  media: {
    tablet: '@media (min-width: 568px)',
    desktop: '@media (min-width: 1024px)',
  },
};

export const lightPartial: RecursivePartial<ThemeInterface> = {
  colors: {
    text: {
      paragraph: '#7A7D92',
      header: '#2A2C3E',
      alternative: '#F8FAFD',
    },
    background: {
      app: '#EAEEF6',
      default: '#F8FAFD',
      alternative: '#F85705',
    },
  },
};

export const darkPartial: RecursivePartial<ThemeInterface> = {
  colors: {
    text: {
      paragraph: '#D2D6DE',
      header: '#FFFFFF',
      alternative: '#FFFFFF',
    },
    background: {
      app: '#2B2E37',
      default: '#D2D6DE',
      alternative: '#73BFCA',
    },
  },
};
