import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily: 'Libre Franklin, sans-serif',
  palette: {
    primary1Color: '#0F94A7',
    primary2Color: '#485566',
    accent1Color: '#91C383',
    alternateTextColor: '#FFFFFF',
    borderColor: '#DADDE0',
    textColor: '#485566',
  },
  raisedButton: {
    border: '1px solid #FFF',
  },
});

export default muiTheme;
