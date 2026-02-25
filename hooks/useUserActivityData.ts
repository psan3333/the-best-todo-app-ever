import { useTodosStore } from "@/store/todosStore";

export const useUserActivityData = () => {
    const getTodoStats = useTodosStore((state) => state.getStats);
    const [plannedTodos, completedTodos] = getTodoStats();
};