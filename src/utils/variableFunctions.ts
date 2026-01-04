import { BetterCoreConfig } from "react-better-core";

import { BetterComponentsInternalConfig, externalBetterCoreContextValue } from "../components/BetterComponentsProvider";

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

export const filterHover = (): Record<"z05" | "z1" | "z2" | "z3", React.CSSProperties["filter"]> => {
   if (!checkBetterCoreContextValue(externalBetterCoreContextValue, "filterHover")) return undefined as any;

   return {
      z05: externalBetterCoreContextValue.colorTheme === "dark" ? "brightness(1.2)" : "brightness(0.95)",
      z1: externalBetterCoreContextValue.colorTheme === "dark" ? "brightness(1.3)" : "brightness(0.9)",
      z2: externalBetterCoreContextValue.colorTheme === "dark" ? "brightness(1.6)" : "brightness(0.8)",
      z3: externalBetterCoreContextValue.colorTheme === "dark" ? "brightness(1.9)" : "brightness(0.7)",
   };
};
