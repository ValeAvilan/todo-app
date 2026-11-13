import { Children, createContext, useState } from "react";
import {Colors} from "@/constants/Colors";
import {Appearance} from "react-native";

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
    const [colorSheme, setColorSheme] = useState(Appearance.getColorScheme());
    const theme = colorSheme === 'dark' ? Colors.dark : Colors.light;

    return(
        <ThemeContext.Provider
            value={{
                colorSheme,
                setColorSheme,
                theme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};