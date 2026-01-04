export {
   useTheme,
   useLoader,
   useLoaderControls,
   countries,
   type OmitProps,
   type ExcludeOptions,
   type PickValue,
   type PartialRecord,
   type DeepPartialRecord,
   type PickAllRequired,
   type AnyOtherString,
   type AssetName,
   type AssetsConfig,
   type Country,
   type IconName,
   type IconsConfig,
   type LoaderName,
   type LoaderConfig,
   type Color,
   type ColorName,
   type ColorTheme,
   type Colors,
   type Styles,
   type Theme,
   type ThemeConfig,
   lightenColor,
   darkenColor,
   saturateColor,
   desaturateColor,
   generateRandomString,
   formatPhoneNumber,
   eventPreventDefault,
   eventStopPropagation,
   eventPreventStop,
   getPluralWord,
   useBooleanState,
   useDebounceState,
   loaderControls,
   colorThemeControls,
} from "react-better-core";

import BetterComponentsProvider, {
   useBetterComponentsContext,
   type BetterComponentsProviderConfig,
} from "./components/BetterComponentsProvider";

import { type AppConfig, type BetterComponentsConfig } from "./types/config";
import { type ComponentMarginProps, type ComponentPaddingProps } from "./types/components";
import { type PluginName, type BetterComponentsPlugin } from "./types/plugin";

import { filterHover } from "./utils/variableFunctions";

import { generateAsyncStorage } from "./utils/asyncStorage";

import View, { type ViewProps } from "./components/View";
import Text, { type TextProps } from "./components/Text";

export * from "./plugins";

export {
   BetterComponentsProvider,
   useBetterComponentsContext as useBetterComponentsContext,
   BetterComponentsProviderConfig,

   // Constants

   // Types
   AppConfig,
   BetterComponentsConfig as BetterComponentsConfig,
   ComponentMarginProps,
   ComponentPaddingProps,
   PluginName,
   BetterComponentsPlugin,

   // Hooks

   // Functions

   // Variable Functions
   filterHover,

   // AsyncStorage
   generateAsyncStorage,

   // Components
   View,
   ViewProps,
   Text,
   TextProps,
};
