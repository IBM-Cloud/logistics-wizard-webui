import getMuiTheme from 'material-ui/styles/getMuiTheme';
import colors from './base/_colors.scss';

export const palette = {
  navColor: colors.navColor,
  primary1Color: colors.primary1Color,
  primary2Color: colors.primary2Color,
  primary3Color: colors.primary3Color,
  accent1Color: colors.accent1Color,
  // accent2Color: grey100,
  // accent3Color: grey500,
  textColor: colors.textColor,
  // secondaryTextColor: fade(darkBlack, 0.54),
  alternateTextColor: colors.alternateTextColor,
  // canvasColor: white,
  borderColor: colors.borderColor,
  // disabledColor: fade(darkBlack, 0.3),
  // pickerHeaderColor: cyan500,
  // clockCircleColor: fade(darkBlack, 0.07),
  // shadowColor: fullBlack,
};

const muiTheme = getMuiTheme({
  palette,
  fontFamily: 'Libre Franklin, sans-serif',
  raisedButton: {
    border: '1px solid #FFF',
  },
  toolbar: {
    titleFontSize: '1rem',
    separatorColor: palette.primary3Color,
    backgroundColor: palette.navColor,
    iconColor: palette.alternateTextColor,
  },
  tableHeader: {
    // borderColor: palette.borderColor,
  },
  tableHeaderColumn: {
    textColor: palette.primary1Color,
    height: 1,
    // spacing: 24,
  },
  tableRow: {
    // hoverColor: palette.accent2Color,
    // stripeColor: fade(lighten(palette.primary1Color, 0.5), 0.4),
    // selectedColor: palette.borderColor,
    // textColor: palette.primary1Color,
    // borderColor: palette.borderColor,
    height: 1,
  },
});

export default muiTheme;
