import { ILoginAccount } from "@/types/ILoginAccount";
import { RChildren } from "@/types/RChildren";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef } from "react";
import { Updater, useImmer } from "use-immer";

export interface CameraDataProviderProps extends RChildren {}

type ContextValue = readonly [ILoginAccount[], Updater<ILoginAccount[]>];
const Context = createContext<ContextValue>([] as any);
const key = "userLoginList";

function UserListProvider(props: CameraDataProviderProps) {
  const {
    //

    ..._props
  } = props;

  const [list, setList] = useImmer<ILoginAccount[]>([]);
  const { getItem, setItem } = useAsyncStorage(key);
  const isInit = useRef(true);

  const defaultInit: ILoginAccount[] = [
    {
      useId: "1",
      username: "admin",
      password: "thaothang19",
    },
    {
      useId: "2",
      username: "test1",
      password: "pass1",
    },
    {
      useId: "3",
      username: "test2",
      password: "pass2",
    },
  ];

  useEffect(() => {
    getItem((err, result) => {
      isInit.current = false;

      if (err) {
        //
      }

      if (result === null || result === undefined || result === "[]") {
        setItem(JSON.stringify(defaultInit));
        setList(defaultInit);

        // setItem("[]");
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

export const useUserListContextImmer = () => useContext(Context);

export default UserListProvider;
