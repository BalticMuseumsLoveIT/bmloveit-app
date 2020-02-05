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

    // Old properties

    color?: any;
    media?: any;
  }
}
