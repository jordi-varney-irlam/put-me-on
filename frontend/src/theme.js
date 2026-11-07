import { extendTheme } from '@chakra-ui/react';

// Palette: pale butter yellow + purple
const theme = extendTheme({
  fonts: {
    heading: `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  colors: {
    butter: {
      50: '#FFFDF3',
      100: '#FFF9E0',
      200: '#FFF3C2',
      300: '#FFEA99',
      400: '#FFDE6B',
      500: '#F5C842',
      600: '#D9A91F',
      700: '#A87F12',
      800: '#75580C',
      900: '#433206',
    },
    purple: {
      50: '#F5EEFF',
      100: '#E9DBFF',
      200: '#D4B8FF',
      300: '#B98CFC',
      400: '#9D63F5',
      500: '#8243E8',
      600: '#6B2FCC',
      700: '#5524A3',
      800: '#3E1A78',
      900: '#27104D',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'butter.50',
        color: 'gray.800',
        backgroundImage:
          'radial-gradient(circle at 10% 0%, rgba(255, 222, 107, 0.35) 0, transparent 45%), radial-gradient(circle at 90% 20%, rgba(185, 140, 252, 0.30) 0, transparent 40%), radial-gradient(circle at 50% 100%, rgba(255, 234, 153, 0.35) 0, transparent 50%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      },
      '::selection': { bg: 'purple.200' },
    },
  },
  radii: { card: '1.25rem' },
  shadows: {
    soft: '0 4px 24px -6px rgba(85, 36, 163, 0.18)',
    lift: '0 14px 40px -10px rgba(85, 36, 163, 0.35)',
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'purple' },
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 600,
        transition: 'all 0.2s ease',
        _hover: { transform: 'translateY(-1px)' },
        _active: { transform: 'translateY(0)' },
      },
    },
    Input: { defaultProps: { focusBorderColor: 'purple.400' } },
    Textarea: { defaultProps: { focusBorderColor: 'purple.400' } },
    Select: { defaultProps: { focusBorderColor: 'purple.400' } },
  },
});

export default theme;
