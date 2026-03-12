import SQLiteDB from "@/db/db";
import { useDBCache } from "@/hooks/useDBCache";
import { createContext, ReactNode, useMemo } from "react";
import { ViewProps } from "react-native";

export const DBContext = createContext<SQLiteDB | null>(null);

export const DBProvider = ({
    children,
}: ViewProps & { children: ReactNode }) => {
    const cache = useDBCache();
    const db = useMemo(() => new SQLiteDB(cache), [cache]);

    return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
};
