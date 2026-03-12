import { useThemeColors } from "@/hooks/useThemeColors";
import React, { ReactNode } from "react";
import {
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleProp,
    ViewStyle,
} from "react-native";

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    style: StyleProp<ViewStyle>;
    children: ReactNode;
}

const Button = ({
    onPress,
    style,
    children,
    ...props
}: PressableProps & ButtonProps) => {
    const themeColors = useThemeColors();

    return (
        <Pressable
            style={({ pressed }) => [
                style,
                {
                    backgroundColor: pressed
                        ? themeColors.button.pressed
                        : themeColors.button.default,
                },
            ]}
            onPress={onPress}
            {...props}
        >
            {children}
        </Pressable>
    );
};

export default Button;
