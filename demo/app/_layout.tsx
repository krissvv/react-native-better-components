import { Stack } from "expo-router";

import { BetterComponentsPlugin, BetterComponentsProvider } from "../../src/index";

const plugins: BetterComponentsPlugin[] = [];

export default function RootLayout() {
   return (
      <BetterComponentsProvider
         config={{
            assets: {
               logo: require("../assets/images/icon.png"),
            },
         }}
         plugins={plugins}
      >
         <Stack />
      </BetterComponentsProvider>
   );
}
