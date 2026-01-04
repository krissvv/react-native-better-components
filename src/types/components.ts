import { ViewStyle } from "react-native";
import { OmitProps } from "react-better-core";

import { BetterComponentsPlugin } from "./plugin";

export type ComponentStyle<Style extends ViewStyle = ViewStyle> = OmitProps<
   Style,
   "shadowOffset" | ComponentExcludeMarginProps | ComponentExcludePaddingProps
> & {
   shadowOffsetWidth?: number;
   shadowOffsetHeight?: number;
};

export type ComponentMarginProps = Pick<
   ComponentStyle,
   "margin" | "marginTop" | "marginBottom" | "marginLeft" | "marginRight" | "marginVertical" | "marginHorizontal"
>;
export type ComponentExcludeMarginProps =
   | "marginBlock"
   | "marginBlockStart"
   | "marginBlockEnd"
   | "marginInline"
   | "marginInlineStart"
   | "marginInlineEnd"
   | "marginStart"
   | "marginEnd";

export type ComponentPaddingProps = Pick<
   ComponentStyle,
   "padding" | "paddingTop" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingVertical" | "paddingHorizontal"
>;
export type ComponentExcludePaddingProps =
   | "paddingBlock"
   | "paddingBlockStart"
   | "paddingBlockEnd"
   | "paddingInline"
   | "paddingInlineStart"
   | "paddingInlineEnd"
   | "paddingStart"
   | "paddingEnd";

export type ComponentPropWithRef<ComponentRef, ComponentProps> = ComponentProps & { ref?: React.Ref<ComponentRef> };
export type ComponentPropWithPlugin<ComponentProps> = ComponentProps & {
   plugin: BetterComponentsPlugin;
};
