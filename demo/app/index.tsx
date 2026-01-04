import { memo } from "react";

import { Text, useTheme, View } from "../../src/index";

function Index() {
   const theme = useTheme();

   return (
      <View flex={1} gap={theme.styles.gap} marginHorizontal={theme.styles.space} paddingTop={theme.styles.space}>
         <View.box>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, officiis.</Text>
         </View.box>
         <View.box withShadow>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, officiis.</Text>
         </View.box>
      </View>
   );
}

export default memo(Index);
