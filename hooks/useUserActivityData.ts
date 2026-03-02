import { useTodosStore } from "@/store/todosStore";

export const useUserActivityData = () => {
    const getTodoStats = useTodosStore((state) => state.getUserStats);
    const userDailyTarget = useTodosStore((state) => state.userDailyTarget);
    const [plannedTodos, completedTodos] = getTodoStats();
};