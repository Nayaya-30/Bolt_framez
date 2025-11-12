export const COLORS = {
  // Primary colors
  primary: '#8a2be2', // Purple accent
  primaryDark: '#6a1cb9',
  primaryLight: '#a45ee5',
  
  // Background colors
  background: '#1a1a1a', // Dark gray
  backgroundLight: '#2a2a2a',
  backgroundDark: '#0a0a0a',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#aaaaaa',
  textTertiary: '#888888',
  
  // UI elements
  border: '#333333',
  cardBackground: 'rgba(40, 40, 40, 0.7)',
  
  // Status colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
};

export const SIZES = {
  radius: 10,
  padding: 20,
  margin: 15,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  heavy: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 10,
    elevation: 12,
  },
};