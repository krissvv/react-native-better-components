import NativeAsyncStorage from "@react-native-async-storage/async-storage";

export function generateAsyncStorage<AsyncStorage extends object>(): {
   setItem: <StorageName extends keyof AsyncStorage>(name: StorageName, value: AsyncStorage[StorageName]) => void;
   getItem: <StorageName extends keyof AsyncStorage>(
      name: StorageName,
   ) => Promise<AsyncStorage[StorageName] | undefined>;
   removeItem: (name: keyof AsyncStorage) => void;
   removeAllItems: () => void;
} {
   return {
      setItem: async (name, value) => {
         if (value) await NativeAsyncStorage.setItem(name.toString(), JSON.stringify(value));
         else await NativeAsyncStorage.removeItem(name.toString());
      },
      getItem: async (name) => {
         const item = await NativeAsyncStorage.getItem(name.toString());

         if (item === null) return undefined;

         try {
            return JSON.parse(item);
         } catch (error) {
            return undefined;
         }
      },
      removeItem: async (name) => {
         await NativeAsyncStorage.removeItem(name.toString());
      },
      removeAllItems: () => {
         NativeAsyncStorage.clear();
      },
   };
}
