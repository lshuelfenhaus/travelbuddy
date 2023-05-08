import themestyles from "./Colors";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

//BORDERS
export const BORDER_RADIUS = 8;
export const BORDER_COLOR= themestyles.charcoal400.color
export const BORDER_WIDTH = 2;

//MARGINS
export const MARGIN = 8;

//GENERAL SPACING UNITS
export const SPACE = 40;
export const S_SPACE = 4;
export const M_SPACE = S_SPACE * 2;
export const L_SPACE = M_SPACE * 2;

export const ELEMENT_SPACING = 16;
//TEXT SIZES
export const TEXT_LINEAR_ADD = 4;
export const TEXT_SMALL = 16;
export const TEXT_REGULAR = TEXT_SMALL + TEXT_LINEAR_ADD;
export const TEXT_LARGE = TEXT_REGULAR + TEXT_LINEAR_ADD;
export const TEXT_XLARGE = TEXT_LARGE + TEXT_LINEAR_ADD;

//PADDING
export const PADDING_REGULAR = width * 0.01;
export const PADDING_LARGE = width * 0.025;
export const PADDING_XLARGE = width *  0.05;

//BUTTONGS
export const BUTTON_COLOR = themestyles.delftBlue.color;
export const CLOSE_BUTTON_COLOR = 'tomato';
export const HIGHLIGHT_COLOR = themestyles.charcoal300.color;
export const FORM_BUTTON_ICON_COLOR = themestyles.charcoal400.color;
//ICONS
export const ICON_COLOR = themestyles.charcoal400.color;
export const ICON_SIZE_L = width * 0.01;
export const ICON_SIZE_M = width * 0.075;
export const ICON_SIZE_S = width * 0.05;
//BADGES
export const BADGE_COLOR = themestyles.charcoal400.color;
export const BADGE_TEXT_COLOR = "white";
export const BADGE_MIN_WIDTH = 100;

//BOTTOM NAVIGATION
export const BOTTOM_NAVIGATION_HEIGHT = 0.07;
