import { BetterCoreConfig } from "react-better-core";

import {
   BetterComponentsInternalConfig,
   externalBetterCoreContextValue,
} from "../components/BetterComponentsProvider";

export const checkBetterCoreContextValue = (
   value: BetterCoreConfig | undefined,
   functionsName: string,
): value is BetterCoreConfig => {
   if (value === undefined) {
      throw new Error(
         `\`${functionsName}()\` must be used within a \`<BetterCoreProvider>\`. Make sure to add one at the root of your component tree.`,
      );
   }

   return value !== undefined;
};
export const checkBetterComponentsContextValue = (
   value: BetterComponentsInternalConfig | undefined,
   functionsName: string,
): value is BetterComponentsInternalConfig => {
   if (value === undefined) {
      throw new Error(
         `\`${functionsName}()\` must be used within a \`<BetterComponentsProvider>\`. Make sure to add one at the root of your component tree.`,
      );
   }

   return value !== undefined;
};

export const pressStrength = (): Record<"z05" | "z1" | "z2" | "z3", number> => {
   if (!checkBetterCoreContextValue(externalBetterCoreContextValue, "pressStrength")) return undefined as any;

   return {
      z05: externalBetterCoreContextValue.colorTheme === "dark" ? 0.85 : 0.95,
      z1: externalBetterCoreContextValue.colorTheme === "dark" ? 0.6 : 0.8,
      z2: externalBetterCoreContextValue.colorTheme === "dark" ? 0.5 : 0.7,
      z3: externalBetterCoreContextValue.colorTheme === "dark" ? 0.4 : 0.6,
   };
};
