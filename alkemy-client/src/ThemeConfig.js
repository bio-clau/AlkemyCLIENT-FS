import {createTheme} from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
          light:'#9683bc',
          main: '#67568c',
          dark:'#3b2d5e',
          contrastText: "#fff"
        },
        secondary: {
          main: '#ff6e6c',
          light: '#ffa09a',
          dark: '#c73c41',
          contrastText: "#000"
        },
        white:{
          main:'#fff'
        },
        black: {
          main:'#000'
        }
      },
})