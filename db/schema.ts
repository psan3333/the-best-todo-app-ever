import { TodoType } from "@/constants/types";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTodo = sqliteTable(
    "user_todo",
    {
        id: integer().primaryKey({ autoIncrement: true }),
        type: text().$type<TodoType>().notNull(),
        title: text().notNull(),
        description: text().default(""),
        metricOfCompletion: text().default(""),
        changedAt: integer({ mode: "timestamp" }).notNull(),
    },
    (table) => [index("changedAt").on(table.changedAt)],
);
