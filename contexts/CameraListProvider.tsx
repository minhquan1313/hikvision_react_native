import { ICamera } from "@/types/ICamera";
import { RChildren } from "@/types/RChildren";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef } from "react";
import { Updater, useImmer } from "use-immer";

export interface CameraDataProviderProps extends RChildren {}

type ContextValue = readonly [ICamera[], Updater<ICamera[]>];
const Context = createContext<ContextValue>([] as any);
const key = "cameraIpList";

function CameraListProvider(props: CameraDataProviderProps) {
  const {
    //

    ..._props
  } = props;

  const [list, setList] = useImmer<ICamera[]>([]);
  const { getItem, setItem } = useAsyncStorage(key);
  const isInit = useRef(true);

  const setCameraList: typeof setList = (param) => {
    setList(param);
  };

  useEffect(() => {
    getItem((err, result) => {
      isInit.current = false;

      if (err) {
        //
      }

      if (result === null || result === undefined || result === "[]") {
        // setItem(JSON.stringify(defaultInit));
        // setList(defaultInit);

        setItem("[]");
        return;
      }

      const data = JSON.parse(result);

      if (Array.isArray(data) && data.length > 0) setList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInit.current) return;

    setItem(JSON.stringify(list));
  }, [list, setItem]);

  const value = [list, setList] as const;

  return (
    <Context.Provider
      value={value}
      {..._props}
    />
  );
}

export const useCameraListContextImmer = () => useContext(Context);

export default CameraListProvider;
