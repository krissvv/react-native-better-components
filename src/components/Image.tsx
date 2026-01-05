import { memo, useEffect, useMemo } from "react";
import { AnyOtherString, AssetName, OmitProps, useBetterCoreContext, useTheme } from "react-better-core";
import {
   ImageSourcePropType,
   Image as NativeImage,
   ImageProps as NativeImageProps,
   ImageStyle as NativeImageStyle,
} from "react-native";

import { ComponentStyle } from "../types/components";
import View from "./View";
import Text from "./Text";

export type ImageProps = {
   name?: AssetName | AnyOtherString;
   source?: ImageSourcePropType;
   /** @default false */
   withDevFittingMode?: boolean;
} & OmitProps<NativeImageProps, "source"> &
   ComponentStyle<NativeImageStyle>;

type ImageComponentType = {
   (props: ImageProps): React.ReactElement;
   profileImage: (
      props: OmitProps<ImageProps, "width" | "height"> & {
         /** @default 50 */
         size?: number;
         letters?: string;
         backgroundColor?: string;
      },
   ) => React.ReactElement;
};

const ImageComponent: ImageComponentType = function Image({ name, source, withDevFittingMode, ...props }) {
   const { assets } = useBetterCoreContext();

   const style = useMemo<NativeImageStyle>(
      () => ({
         width: 100,
         height: 100,
         ...(withDevFittingMode
            ? {
                 borderWidth: 1,
                 borderColor: "#eb39f7",
              }
            : {}),
         ...props,
      }),
      [withDevFittingMode, props],
   );

   useEffect(() => {
      if (!name) return;

      if (!assets[name.toString()])
         console.warn(
            `The asset \`${name}\` you are trying to use does not exist. Make sure to add it to the \`assets\` object in \`<BetterComponentsProvider>\` config value prop.`,
         );
   }, [assets, name]);

   return <NativeImage source={name ? (assets[name.toString()] as any) : source} style={style} {...props} />;
};

ImageComponent.profileImage = function ProfileImage({ size = 50, letters, backgroundColor, ...props }) {
   const theme = useTheme();

   return letters ? (
      <View
         width={size}
         height={size}
         backgroundColor={backgroundColor ?? theme.colors.backgroundSecondary}
         borderWidth={1}
         borderColor={theme.colors.border}
         borderRadius={999}
         alignItems="center"
         justifyContent="center"
         {...props}
      >
         <Text fontSize={size / 2.5} fontWeight={700} marginTop={1}>
            {letters.toUpperCase().slice(0, 2)}
         </Text>
      </View>
   ) : (
      <ImageComponent
         width={size}
         height={size}
         borderWidth={1}
         borderColor={theme.colors.border}
         borderRadius={999}
         objectFit="cover"
         {...props}
      />
   );
} as ImageComponentType[`profileImage`];

/** @description size is set to 100x100 by default */
const Image = memo(ImageComponent) as any as typeof ImageComponent & {
   profileImage: typeof ImageComponent.profileImage;
};

Image.profileImage = ImageComponent.profileImage;

export default Image;
