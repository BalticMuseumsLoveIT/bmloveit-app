import 'styled-components';
import {
  ThemeColorsInterface,
  ThemeFontsInterface,
  ThemeType,
} from 'utils/interfaces';

declare module 'styled-components' {
  export interface DefaultTheme {
    type: ThemeType;
    fonts: ThemeFontsInterface;
    colors: ThemeColorsInterface;

    isMenuOpened: boolean;

    // Old properties

    color?: any;
    media?: any;
  }
}
