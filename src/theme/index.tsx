import { 
  createGlobalStyle, 
  DefaultTheme, 
} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.theme.whiteColor ? "white": "black")};
  }
`

export const theme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
}