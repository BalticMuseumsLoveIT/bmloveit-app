import { ThemeType } from 'utils/interfaces';
import { RecursivePartial } from 'utils/helpers';
import { DefaultTheme } from 'styled-components';
import { darken, desaturate, lighten } from 'polished';

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
  alternative: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
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
      active: '#ED4200',
      visited: '#ED4200',
    },
    button: {
      default: '#FFFFFF',
      disabled: '#BABFCD',
    },
  },
  background: {
    app: '#EAEEF6',
    default: '#FFFFFF',
    alternative: '#F85705',
    menu: '#F8FAFD',
    placeholder: desaturate(0.1, darken(0.04, '#EAEEF6')),
    button: {
      default: '#F85705',
      hover: '#DB4F08',
      hover2: '#F8F8F8',
      focus: '#C34100',
      disabled: '#DCE2ED',
    },
  },
  icon: {
    normal: '#7B7D92',
    hover: '#ED591D',
    pressed: '#BB4312',
    inactive: '#BBBFCD',
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

export const lightPartial: RecursivePartial<DefaultTheme> = {};

export const darkPartial: RecursivePartial<DefaultTheme> = {
  colors: {
    text: {
      paragraph: '#7A7D92',
      header: '#F8FAFD',
      alternative: '#FFFFFF',
      anchor: {
        link: '#F8FAFD',
        hover: '#65BFCB',
        active: '#3C96A2',
        visited: '#3C96A2',
      },
      button: {
        default: '#FFFFFF',
        disabled: '#BABFCD',
      },
    },
    background: {
      app: '#2A2E37',
      default: '#464856',
      alternative: '#73BFCA',
      menu: '#464856',
      placeholder: desaturate(0.0, lighten(0.05, '#2A2E37')),
      button: {
        default: '#F85705',
        hover: '#DB4F08',
        hover2: '#F8F8F8',
        focus: '#C34100',
        disabled: '#DCE2ED',
      },
    },
    icon: {
      normal: '#EAEEF6',
      hover: '#73BFCA',
      pressed: '#73BFCA',
      inactive: '#7B7D92',
    },
  },
};
