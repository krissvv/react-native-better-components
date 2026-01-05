import { memo } from "react";
import { ActivityIndicator, ColorValue } from "react-native";
import { OmitProps, useTheme } from "react-better-core";

import { ComponentMarginProps } from "../types/components";

import View from "./View";
import Text from "./Text";

export type LoaderSize = "small" | "large";

export type LoaderProps = {
   /** @default "small" */
   size?: LoaderSize;
   color?: ColorValue;
} & ComponentMarginProps;

type LoaderComponentType = {
   (props: LoaderProps): React.ReactElement;
   box: (
      props: OmitProps<LoaderProps, "size"> & {
         /** @default "Loading..." */
         text?: string;
         /** @default "large" */
         size?: LoaderSize;
      },
   ) => React.ReactElement;
   text: (
      props: LoaderProps & {
         /** @default "Loading..." */
         text?: string;
      },
   ) => React.ReactElement;
};

const LoaderComponent: LoaderComponentType = function Loader({ size = "small", color, ...props }) {
   const theme = useTheme();

   return (
      <View {...props}>
         <ActivityIndicator size={size} color={color ?? theme.colors.textPrimary} />
      </View>
   );
};

LoaderComponent.box = function Box({ text = "Loading...", size = "large", color, ...props }) {
   const theme = useTheme();

   return (
      <View
         width="100%"
         alignItems="center"
         gap={theme.styles.gap}
         marginVertical={theme.styles.space}
         {...props}
      >
         <Loader size={size} color={color} />

         {text && (
            <Text textAlign="center" color={color ?? theme.colors.textSecondary}>
               {text}
            </Text>
         )}
      </View>
   );
} as LoaderComponentType[`box`];

LoaderComponent.text = function LoaderText({ text = "Loading...", size, color, ...props }) {
   const theme = useTheme();

   return (
      <View
         isRow
         alignItems="center"
         justifyContent="center"
         gap={theme.styles.gap}
         marginVertical={theme.styles.space}
         {...props}
      >
         <Loader size={size} color={color} />

         {text && (
            <Text textAlign="center" color={color ?? theme.colors.textSecondary}>
               {text}
            </Text>
         )}
      </View>
   );
} as LoaderComponentType["text"];

const Loader = memo(LoaderComponent) as any as typeof LoaderComponent & {
   box: typeof LoaderComponent.box;
   text: typeof LoaderComponent.text;
};

Loader.box = LoaderComponent.box;
Loader.text = LoaderComponent.text;

export default Loader;
