import { memo } from "react";

import { Animate, Button, ScreenHolder, Text, useTheme, View } from "../../src/index";

function Index() {
   const theme = useTheme();

   return (
      <ScreenHolder
         footer={
            <ScreenHolder.footer insideBottomSafeArea>
               <View gap={theme.styles.gap}>
                  <Button text="Hello" onPress={() => {}} />
                  <Button.secondary text="Hello" onPress={() => {}} />
                  <Button.destructive text="Hello" onPress={() => {}} />
                  <Button.text text="Hello" isSmall="center" onPress={() => {}} />
               </View>
            </ScreenHolder.footer>
         }
         bottomSpace={theme.styles.space * 2}
      >
         <View gap={theme.styles.gap}>
            <View.box>
               <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, officiis.</Text>
            </View.box>
            <View.box withShadow onPress={() => {}}>
               <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, officiis.</Text>
            </View.box>

            <View isRow>
               <Animate.View
                  width={100}
                  height={100}
                  backgroundColor={"red"}
                  initialBackgroundColor={"red"}
                  whileTapBackgroundColor={"blue"}
               />
            </View>
         </View>
      </ScreenHolder>
   );
}

export default memo(Index);
