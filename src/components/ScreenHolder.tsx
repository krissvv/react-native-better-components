import { memo, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useBooleanState, useTheme } from "react-better-core";

import { useDevice } from "../utils/hooks";

import View, { ViewProps } from "./View";

export type ScreenHolderProps = {
   /** @default false */
   noScroll?: boolean;
   /** @default false */
   noSideSpace?: boolean;
   /** @default 1 (second) */
   refreshTimeout?: number;
   onRefresh?: () => void;
   onRefreshEnd?: () => void;
   /** @default "backgroundBase" */
   backgroundColor?: ViewProps["backgroundColor"];
   /** @default false */
   insideTopSafeArea?: boolean;
   /** @default false */
   insideBottomSafeArea?: boolean;
   /** @default 0 */
   bottomSpace?: number;
   footer?: React.ReactNode;
   children?: React.ReactNode;
};

type ScreenHolderComponentType = {
   (props: ScreenHolderProps): React.ReactElement;
   footer: (props: FooterProps) => React.ReactElement;
};

const ScreenHolderComponent: ScreenHolderComponentType = ({
   noScroll,
   noSideSpace,
   refreshTimeout = 1,
   onRefresh,
   onRefreshEnd,
   backgroundColor,
   insideTopSafeArea,
   insideBottomSafeArea,
   bottomSpace = 0,
   footer,
   children,
}) => {
   const theme = useTheme();
   const device = useDevice();

   const [isRefreshing, setIsRefreshing] = useBooleanState();

   const onRefreshElement = useCallback(() => {
      setIsRefreshing.setTrue();
      onRefresh?.();

      setTimeout(() => {
         setIsRefreshing.setFalse();
         onRefreshEnd?.();
      }, refreshTimeout * 1000);
   }, [onRefresh, onRefreshEnd, refreshTimeout]);

   const content = (
      <View
         flex={1}
         paddingHorizontal={!noSideSpace ? theme.styles.space : undefined}
         paddingTop={theme.styles.gap + (insideTopSafeArea ? device.safeArea.afterCalculations.top : 0)}
         paddingBottom={bottomSpace + (insideBottomSafeArea ? device.safeArea.afterCalculations.bottom : 0)}
      >
         {children}
      </View>
   );

   const withRefresh = onRefresh || onRefreshEnd;

   return (
      <View flex={1} backgroundColor={backgroundColor ?? theme.colors.backgroundBase}>
         <View flex={1}>
            {noScroll ? (
               content
            ) : (
               <ScrollView
                  refreshControl={
                     withRefresh ? (
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshElement} />
                     ) : undefined
                  }
               >
                  {content}
               </ScrollView>
            )}
         </View>

         {footer && <View>{footer}</View>}
      </View>
   );
};

export type FooterProps = {
   /** @default false */
   noSideSpace?: boolean;
   /** @default "backgroundBase" */
   backgroundColor?: ViewProps["backgroundColor"];
   /** @default false */
   insideBottomSafeArea?: boolean;
   children?: React.ReactNode;
};

ScreenHolderComponent.footer = function Footer({
   noSideSpace,
   backgroundColor,
   insideBottomSafeArea,
   children,
}) {
   const theme = useTheme();
   const device = useDevice();

   return (
      <View
         backgroundColor={backgroundColor ?? theme.colors.backgroundBase}
         paddingHorizontal={!noSideSpace ? theme.styles.space : undefined}
         paddingTop={theme.styles.gap}
         paddingBottom={insideBottomSafeArea ? device.safeArea.afterCalculations.bottom : undefined}
      >
         {children}
      </View>
   );
} as ScreenHolderComponentType[`footer`];

const ScreenHolder = memo(ScreenHolderComponent) as any as typeof ScreenHolderComponent & {
   footer: typeof ScreenHolderComponent.footer;
};

ScreenHolder.footer = ScreenHolderComponent.footer;

export default ScreenHolder;
