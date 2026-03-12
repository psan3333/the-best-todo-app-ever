import { DBCache, TimePeriod, Todo, TodoType } from "@/constants/types";
import drizzleDB from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export default class SQLiteDB {
    #cache: DBCache;

    constructor(cache: DBCache) {
        this.#cache = cache;
    }

    public async addTodo(todo: Todo) {
        await drizzleDB.insert(schema.userTodo).values(todo);
    }

    public async deleteTodo(todo: Todo) {
        await drizzleDB
            .delete(schema.userTodo)
            .where(eq(schema.userTodo.id, todo.id));
    }

    public async setTodoToFinished(todo: Todo) {
        await this.updateTodo({
            ...todo,
            type: "finished",
        });
    }

    public async updateTodo(todo: Todo) {
        await drizzleDB
            .update(schema.userTodo)
            .set(todo)
            .where(eq(schema.userTodo.id, todo.id));
    }

    public getTodosByPeriodAndType(period: TimePeriod, type: TodoType) {
        return this.#cache[`${period}Data`][type];
    }
}
