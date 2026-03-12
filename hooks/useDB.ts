import SQLiteDB from "@/db/db";
import { DBContext } from "@/providers/DBProvider";
import { useContext } from "react";

export const useDB = (): SQLiteDB => {
    const db = useContext(DBContext);
    if (!db) {
        throw new Error("useDB must be used within a DBProvider");
    }
    return db;
};
