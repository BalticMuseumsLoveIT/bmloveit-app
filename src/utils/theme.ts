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
    error: '#B40000',
    success: '#71BF48',
    anchor: {
      link: '#2A2C3E',
      hover: '#F85705',
      active: '#ED4200',
      visited: '#ED4200',
    },
  },
  background: {
    app: '#EAEEF6',
    default: '#FFFFFF',
    negative: '#2A2C3E',
    alternative: '#F85705',
    menu: '#F8FAFD',
    placeholder: desaturate(0.1, darken(0.04, '#EAEEF6')),
  },
  button: {
    primary: {
      default: {
        text: '#FFFFFF',
        background: '#F85705',
      },
      hover: {
        text: '#FFFFFF',
        background: '#DB4F08',
      },
      focus: {
        text: '#FFFFFF',
        background: '#C34100',
      },
      disabled: {
        text: '#BABFCD',
        background: '#DCE2ED',
      },
    },
    secondary: {
      default: {
        text: '#7A7D92',
        background: '#FFFFFF',
      },
      hover: {
        text: '#DB4F08',
        background: '#F8F8F8',
      },
      focus: {
        text: '#C34100',
        background: '#F8F8F8',
      },
      disabled: {
        text: '#BABFCD',
        background: '#DCE2ED',
      },
    },
    outline: {
      default: {
        text: '#7A7D92',
        background: 'transparent',
      },
      hover: {
        text: '#DB4F08',
        background: 'transparent',
      },
      focus: {
        text: '#C34100',
        background: 'transparent',
      },
      disabled: {
        text: '#BABFCD',
        background: 'transparent',
      },
    },
  },
  list: {
    border: '#EAEEF6',
    header: {
      default: {
        text: '#2A2C3E',
        background: '#F8FAFD',
      },
      hover: {
        text: '#2A2C3E',
        background: '#F8FAFD',
      },
      focus: {
        text: '#F85705',
        background: '#F8FAFD',
      },
    },
    item: {
      default: {
        text: '#2A2C3E',
        background: '#FFFFFF',
      },
      hover: {
        text: '#2A2C3E',
        background: '#F8FAFD',
      },
      focus: {
        text: '#F85705',
        background: '#F8FAFD',
      },
    },
    info: '#7A7D92',
  },
  icon: {
    normal: '#7B7D92',
    hover: '#ED591D',
    pressed: '#BB4312',
    inactive: '#BBBFCD',
  },
  form: {
    label: '#7A7D92',
    background: '#FFFFFF',
    textInput: {
      default: '#7A7D92',
      placeholder: '#D6D6D6',
      hover: '#A9AFBC',
      focus: '#7A7D92',
      error: '#B40000',
    },
  },
};

export const defaultTheme: DefaultTheme = {
  type: defaultType,
  fonts: defaultFonts,
  colors: defaultColors,

  isMenuOpened: false,
};

export const lightPartial: RecursivePartial<DefaultTheme> = {};

export const darkPartial: RecursivePartial<DefaultTheme> = {
  colors: {
    text: {
      paragraph: '#EAEEF6',
      header: '#F8FAFD',
      alternative: '#FFFFFF',
      error: '#DC7A7C',
      success: '#71BF48',
      anchor: {
        link: '#F8FAFD',
        hover: '#65BFCB',
        active: '#3C96A2',
        visited: '#3C96A2',
      },
    },
    background: {
      app: '#2A2E37',
      default: '#454856',
      alternative: '#65BFCB',
      menu: desaturate(0.0, lighten(0.05, '#454856')),
      placeholder: desaturate(0.0, lighten(0.05, '#2A2E37')),
    },
    button: {
      primary: {
        default: {
          text: '#FFFFFF',
          background: '#65BFCB',
        },
        hover: {
          text: '#FFFFFF',
          background: '#3C96A2',
        },
        focus: {
          text: '#FFFFFF',
          background: '#007B8B',
        },
        disabled: {
          text: '#646672',
          background: '#454856',
        },
      },
      secondary: {
        default: {
          text: '#7A7D92',
          background: '#FFFFFF',
        },
        hover: {
          text: '#3C96A2',
          background: '#F8F8F8',
        },
        focus: {
          text: '#007B8B',
          background: '#F8F8F8',
        },
        disabled: {
          text: '#646672',
          background: '#454856',
        },
      },
      outline: {
        default: {
          text: '#F8FAFD',
          background: 'transparent',
        },
        hover: {
          text: '#65BFCB',
          background: 'transparent',
        },
        focus: {
          text: '#007B8B',
          background: 'transparent',
        },
        disabled: {
          text: '#646672',
          background: 'transparent',
        },
      },
    },
    list: {
      border: darken(0.05, '#454856'),
      header: {
        default: {
          text: '#F8FAFD',
          background: darken(0.05, '#454856'),
        },
        hover: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
        focus: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
      },
      item: {
        default: {
          text: '#F8FAFD',
          background: '#454856',
        },
        hover: {
          text: '#F8FAFD',
          background: '#7A7D92',
        },
        focus: {
          text: '#65BFCB',
          background: '#505265',
        },
      },
      info: '#C8C9D5',
    },
    icon: {
      normal: '#EAEEF6',
      hover: '#73BFCA',
      pressed: '#73BFCA',
      inactive: '#7B7D92',
    },
    form: {
      label: '#7A7D92',
      background: '#454856',
      textInput: {
        default: '#EAEEF6',
        placeholder: '#7A7D92',
        hover: '#A9AFBC',
        focus: '#2A2C3E',
        error: '#F68686',
      },
    },
  },
};
