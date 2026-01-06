import { memo } from "react";
import { useTheme } from "react-better-core";
import { StatusBar as NativeStatusBar, Platform } from "react-native";

export type StatusBarProps = {
   darkStatusBar?: boolean;
   /** @default false */
   hidden?: boolean;
   barStyle?: React.ComponentProps<typeof NativeStatusBar>["barStyle"];
   androidBarStyle?: React.ComponentProps<typeof NativeStatusBar>["barStyle"];
   iOSBarStyle?: React.ComponentProps<typeof NativeStatusBar>["barStyle"];
};

function StatusBar({ darkStatusBar, hidden, barStyle, androidBarStyle, iOSBarStyle }: StatusBarProps) {
   const theme = useTheme();

   return (
      <NativeStatusBar
         backgroundColor={darkStatusBar ? theme.colors.backgroundSecondary : undefined}
         barStyle={barStyle ?? (Platform.OS === "android" ? androidBarStyle : iOSBarStyle)}
         hidden={hidden}
      />
   );
}

export default memo(StatusBar);
