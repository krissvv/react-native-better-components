import { BetterComponentsPluginConstructor } from "../types/plugin";

export type AsyncStoragePluginOptions = {};

export const defaultAsyncStoragePluginOptions: Required<AsyncStoragePluginOptions> = {};

export const asyncStoragePlugin: BetterComponentsPluginConstructor<AsyncStoragePluginOptions> = (options) => ({
   name: "asyncStorage",
   initialize: () => {
      console.log("asyncStorage plugin initialized");
   },
   getConfig: () => ({
      ...defaultAsyncStoragePluginOptions,
      ...options,
   }),
});
