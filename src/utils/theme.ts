import { ThemeType } from 'utils/interfaces';
import { RecursivePartial } from 'utils/helpers';
import { DefaultTheme } from 'styled-components';

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
    anchor: {
      link: '#2A2C3E',
      hover: '#F85705',
      active: '#2A2C3E',
      visited: '#2A2C3E',
      disabled: '#7A7D92',
    },
  },
  background: {
    app: '#EAEEF6',
    default: '#F8FAFD',
    alternative: '#F85705',
    disabled: '#DCE2ED',
  },
};

export const defaultTheme: DefaultTheme = {
  type: defaultType,
  fonts: defaultFonts,
  colors: defaultColors,

  // Old properties left for backward compatibility

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

export const lightPartial: RecursivePartial<DefaultTheme> = {
  colors: {
    text: {
      paragraph: '#7A7D92',
      header: '#2A2C3E',
      alternative: '#F8FAFD',
      anchor: {
        link: '#2A2C3E',
        hover: '#F85705',
        active: '#2A2C3E',
        visited: '#2A2C3E',
        disabled: '#7A7D92',
      },
    },
    background: {
      app: '#EAEEF6',
      default: '#F8FAFD',
      alternative: '#F85705',
      disabled: '#DCE2ED',
    },
  },
};

export const darkPartial: RecursivePartial<DefaultTheme> = {
  colors: {
    text: {
      paragraph: '#7A7D92',
      header: '#F8FAFD',
      alternative: '#FFFFFF',
      anchor: {
        link: '#F8FAFD',
        hover: '#FFFFFF',
        active: '#F8FAFD',
        visited: '#F8FAFD',
        disabled: '#7A7D92',
      },
    },
    background: {
      app: '#2A2E37',
      default: '#464856',
      alternative: '#73BFCA',
      disabled: '#DCE2ED',
    },
  },
};
