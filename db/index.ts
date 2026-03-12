import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expoDB = openDatabaseSync(process.env.DB_URL!);
const drizzleDB = drizzle(expoDB);

export default drizzleDB;
