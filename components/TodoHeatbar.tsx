import { Todo } from "@/constants/types";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTodosStore } from "@/store/todosStore";
import { layoutStyles } from "@/styles/layout";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface HeatBarProps {
    style: StyleProp<ViewStyle>;
    todos: Todo[];
}

const TodoHeatbar = ({ style, todos }: HeatBarProps) => {
    const userDailyTarget = useTodosStore((state) => state.userDailyTarget);
    const colors = useThemeColors();
    const barOpacity = () => {
        const minOpacity = 0.2;
        const maxOpacity = 1.0;
        const userTargetProgress = todos.length / userDailyTarget;
        return {
            opacity: Math.min(
                Math.max(minOpacity, userTargetProgress),
                maxOpacity,
            ),
        };
    };
    return (
        <Shadow
            distance={2}
            offset={[0, 3]}
            style={[layoutStyles.borderMd, style, barOpacity()]}
            startColor={colors.shadow}
        ></Shadow>
    );
};

export default TodoHeatbar;
