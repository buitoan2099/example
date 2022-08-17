import React, {
  memo,
  useMemo,
  createContext,
  useCallback,
  useState,
} from 'react';
import {Theme, ThemeProps, ThemeValueContext} from './Types';

export const ThemeContext = createContext<ThemeValueContext>(
  {} as ThemeValueContext,
);
export const ThemeProvider = memo<ThemeProps>(props => {
  const {initial, children} = props;
  const [theme, setTheme] = useState<Theme>(props.initial.themeDefault);
  const SetThemeCallback = useCallback((newTheme: Theme) => {
    setTheme((currentTheme: Theme) => {
      if (currentTheme.id === newTheme.id) {
        return currentTheme;
      }
      return newTheme;
    });
  }, []);

  const toggleThemeCallback = useCallback(
    (id: string) => {
      setTheme(currentTheme => {
        if (currentTheme.id === id) {
          return currentTheme;
        } else {
          let newTheme = currentTheme;
          Object.entries(initial.resources).forEach(([key, value]) => {
            if (key === id) {
              newTheme = value as Theme;
              return;
            }
          });
          return newTheme;
        }
      });
    },
    [initial.resources],
  );

  const memoizedValue = useMemo(() => {
    const value: ThemeValueContext = {
      theme,
      setTheme: SetThemeCallback,
      changeTheme: toggleThemeCallback,
    };
    return value;
  }, [theme, SetThemeCallback, toggleThemeCallback]);
  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
});

export const useTheme = () => React.useContext(ThemeContext);
