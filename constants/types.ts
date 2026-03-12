export type TodoType = "planned" | "finished";
export type TimePeriod = "today" | "week" | "month" | "year";
export type Todo = {
    id: number;
    type: TodoType;
    title: string;
    description: string | null;
    metricOfCompletion: string | null;
    changedAt: Date;
};
export type DBCache = {
    todayData: Record<TodoType, Todo[]>;
    weekData: Record<TodoType, Todo[]>;
    monthData: Record<TodoType, Todo[]>;
    yearData: Record<TodoType, Todo[]>;
};
