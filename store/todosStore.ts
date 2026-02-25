import { Todo } from "@/constants/types";
import { TZDate } from "@date-fns/tz";
import { randomUUID } from "crypto";
import { addDays, compareAsc, format } from "date-fns";
import { create } from 'zustand';

type TodosStore = {
    /*
        storage format:
        [uniqueDay]: Todo[] - store array of Todo for concrete day
    */
    plannedTodos: Record<string, Todo[]>;
    completedTodos: Record<string, Todo[]>;
    dailyTarget: number;
    getStats: () => [number, number];
    addTodo: (todo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    getTodos: (from: Date, to: Date) => Todo[];
    getCompletedTodos: (from: Date, to: Date) => Todo[];
    getJSONStats: () => string;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
    plannedTodos: {},
    completedTodos: {},
    dailyTarget: 0,
    getStats: () => {
        // linting was disabled for gathering user stats
        const { plannedTodos, completedTodos } = get();
        let plannedCnt = 0;
        let completedCnt = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (let _key in plannedTodos) {
            plannedCnt++;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (let _key in completedTodos) {
            completedCnt++;
        }
        return [plannedCnt, completedCnt];
    },
    addTodo: (todo) => set((state) => {
        let currDay = format(new TZDate(), 'MM-dd-yy');
        return {
            ...state,
            plannedTodos: {
                ...state.plannedTodos,
                [currDay]: [...state.plannedTodos[currDay], {
                    ...todo,
                    id: randomUUID(),
                    timestamp: new TZDate().toString(),
                }],
            },
        };
    }),
    deleteTodo: (todo) => set((state) => {
        let todoTimestamp = format(new TZDate(todo.timestamp), 'MM-dd-yy');
        return {
            ...state,
            plannedTodos: {
                ...state.plannedTodos,
                [todoTimestamp]: state.plannedTodos[todoTimestamp].filter(t => t.id !== todo.id),
            }
        };
    }),
    getTodos: (from, to) => {
        let { plannedTodos } = get();
        let result = [];
        for (let currDate = from; compareAsc(currDate, to) <= 0; currDate = addDays(currDate, 1)) {
            let dayFormat = format(currDate, 'MM-dd-yy');
            result.push(...plannedTodos[dayFormat]);
        }
        return result;
    },
    getCompletedTodos: (from, to) => {
        let { completedTodos } = get();
        let result = [];
        for (let currDate = from; compareAsc(currDate, to) <= 0; currDate = addDays(currDate, 1)) {
            let dayFormat = format(currDate, 'MM-dd-yy');
            if (!(dayFormat in completedTodos)) continue;
            result.push(...completedTodos[dayFormat]);
        }
        return result;
    },
    getJSONStats: () => JSON.stringify(get())
}));
