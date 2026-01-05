import { useEffect, useMemo, useState } from "react";
import { Dimensions, Keyboard, KeyboardEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBooleanState, useTheme } from "react-better-core";

import { animateProps, animateTransitionProps, cssProps } from "../constants/css";

import { ComponentStyle } from "../types/components";

export function useDevice() {
   const theme = useTheme();
   const safeAreaInsets = useSafeAreaInsets();

   const screenDimensions = Dimensions.get("screen");
   const windowDimensions = Dimensions.get("window");
   const isSmallDevice = windowDimensions.height <= 700;

   return {
      safeArea: {
         ...safeAreaInsets,
         /** @description The safe area insets after calculations. Recommended to use this instead of the raw insets. */
         afterCalculations: {
            top: safeAreaInsets.top < 25 ? 32 : safeAreaInsets.top < 40 ? 40 : safeAreaInsets.top,
            bottom:
               (safeAreaInsets.bottom === 0 ? theme.styles.space : safeAreaInsets.bottom) +
               (isSmallDevice ? 0 : theme.styles.space * 2),
            left: safeAreaInsets.left,
            right: safeAreaInsets.right,
         },
      },
      /** @description The dimensions of the device screen. */
      screenDimensions,
      /** @description The dimensions of the app window. */
      windowDimensions,
      /** @description Whether the device is small. */
      isSmallDevice,
   };
}

export function useKeyboard() {
   const [keyboardOpened, setKeyboardOpened] = useBooleanState();
   const [keyboardWillOpen, setKeyboardWillOpen] = useBooleanState();

   const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

   useEffect(() => {
      const keyboardDidShow = (event: KeyboardEvent) => {
         setKeyboardOpened.setTrue();
         setKeyboardHeight(event.endCoordinates.height);
      };
      const keyboardDidHide = () => {
         setKeyboardOpened.setFalse();
         setKeyboardHeight(0);
      };

      const willShowSubscription = Keyboard.addListener("keyboardWillShow", setKeyboardWillOpen.setTrue);
      const willHideSubscription = Keyboard.addListener("keyboardWillHide", setKeyboardWillOpen.setFalse);
      const didShowSubscription = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
      const didHideSubscription = Keyboard.addListener("keyboardDidHide", keyboardDidHide);

      return () => {
         willShowSubscription.remove();
         willHideSubscription.remove();
         didShowSubscription.remove();
         didHideSubscription.remove();
      };
   }, []);

   return {
      isOpened: keyboardOpened,
      willOpen: keyboardWillOpen,
      height: keyboardHeight,
   };
}

export function useComponentPropsGrouper<Props extends object = {}>(
   props: ComponentStyle,
   prefix: string,
): {
   style: ComponentStyle;
   withPrefixStyle: ComponentStyle;
   restProps: Props;
} {
   return useMemo(() => {
      const style: ComponentStyle = {};
      const withPrefixStyle: ComponentStyle = {};
      const restProps = {} as Props;

      for (const key in props) {
         const keyName = key as keyof ComponentStyle;

         if (cssProps.has(keyName.toLowerCase())) {
            (style[keyName] as any) = props[keyName];
         } else if (
            keyName.startsWith(prefix) &&
            (cssProps.has(keyName.slice(prefix.length).toLowerCase()) ||
               animateProps.has(keyName.slice(prefix.length).toLowerCase()) ||
               animateTransitionProps.has(keyName.slice(prefix.length).toLowerCase()))
         ) {
            const realKey = `${keyName.slice(prefix.length, prefix.length + 1).toLowerCase()}${keyName.slice(
               prefix.length + 1,
            )}`;

            (withPrefixStyle[realKey as keyof ComponentStyle] as any) = props[keyName];
         } else {
            (restProps[keyName as keyof Props] as any) = props[keyName];
         }
      }

      return {
         style,
         withPrefixStyle,
         restProps,
      };
   }, [props, prefix]);
}
