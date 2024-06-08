import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataAsync = async (key: string, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    alert(`🚀 ~ storeData ~ e:` + e);
    // saving error
  }
};
export const getDataAsync = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(`🚀 ~ getData ~ e:`, e);

    // saving error
    return null;
  }
};
