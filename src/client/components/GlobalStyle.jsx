import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -ms-overflow-style: none; /* Hide scrollbar in IE/Safari */
  }

  /* Hide scrollbar in Chrome/Opera */
  body::-webkit-scrollbar {
    display: none;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  a > svg {
    width: 100%;
  }
`

export default GlobalStyle
