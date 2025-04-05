import { theme as base, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      white: '#ffffff',
      dark: '#0000000',
      btnBg: '#2FB797',
      cardBg: '#1492B5',
      mainBg:
        'linear-gradient(180deg, #D4D7D8 20%, rgba(124, 137, 141, 0.8) 77%)',
    },
  },
  fonts: {
    body: `Poppins,${base.fonts?.body}, `,
  },
});

export default theme;
