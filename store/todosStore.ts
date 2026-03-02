import { Todo } from "@/constants/types";
import { TZDate } from "@date-fns/tz";
import { addDays, compareAsc, format } from "date-fns";
import { randomUUID } from "expo-crypto";
import { create } from 'zustand';

type TodosStore = {
    // storage format: day -> Todo[] planned/completed on that day
    userDailyTarget: number;
    setDailyTarget: (target: number) => void;

    plannedTodosStore: Record<string, Todo[]>;
    finishedTodosStore: Record<string, Todo[]>;
    addTodo: (todo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    setTodoToFinished: (todo: Todo) => void;
    getTodosByPeriod: (todoType: "finished" | "planned", from: Date, to: Date) => Record<string, Todo[]>[];

    getUserStats: () => [number, number];
    getJSONStore: () => string;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
    userDailyTarget: 4,
    plannedTodosStore: {},
    finishedTodosStore: {},
    setDailyTarget: (target) => set({ userDailyTarget: target }),
    getUserStats: () => {
        const { plannedTodosStore, finishedTodosStore } = get();
        let plannedCnt = 0;
        let finishedCnt = 0;

        for (let timestamp in plannedTodosStore) {
            plannedCnt += plannedTodosStore[timestamp].length;
        }

        for (let timestamp in finishedTodosStore) {
            finishedCnt += finishedTodosStore[timestamp].length;
        }
        return [plannedCnt, finishedCnt];
    },
    addTodo: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(), 'MM-dd-yy');
        return {
            plannedTodosStore: {
                ...state.plannedTodosStore,
                [todoTimestamp]: [...state.plannedTodosStore[todoTimestamp], {
                    ...todo,
                    id: randomUUID(),
                    timestamp: new TZDate().toString(),
                }],
            },
        };
    }),
    deleteTodo: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(todo.timestamp), 'MM-dd-yy');
        return {
            plannedTodosStore: {
                ...state.plannedTodosStore,
                [todoTimestamp]: state.plannedTodosStore[todoTimestamp].filter(t => t.id !== todo.id),
            }
        };
    }),
    setTodoToFinished: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(todo.timestamp), 'MM-dd-yy');
        state.deleteTodo(todo);
        return {
            finishedTodosStore: {
                ...state.finishedTodosStore,
                [todoTimestamp]: [...state.finishedTodosStore[todoTimestamp], {
                    ...todo,
                    timestamp: new TZDate().toString(),
                }],
            }
        };
    }),
    getTodosByPeriod: (todoType, from, to) => {
        const { finishedTodosStore, plannedTodosStore } = get();
        let todos = plannedTodosStore;
        if (todoType === "finished") {
            todos = finishedTodosStore;
        }

        const todosByDay: Record<string, Todo[]>[] = [];
        for (let timestamp = from; compareAsc(timestamp, to) <= 0; timestamp = addDays(timestamp, 1)) {
            const dayToCheck = format(timestamp, 'MM-dd-yy');
            if (!(dayToCheck in todos)) {
                todosByDay.push({
                    [dayToCheck]: [],
                })
            } else {
                todosByDay.push({
                    [dayToCheck]: todos[dayToCheck],
                });
            }
        }
        return todosByDay;
    },
    getJSONStore: () => JSON.stringify(get())
}));
