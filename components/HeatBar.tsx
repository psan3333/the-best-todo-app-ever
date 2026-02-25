import { TimePeriod, Todo } from "@/constants/types";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface HeatBarProps {
    period: TimePeriod;
    style: StyleProp<ViewStyle>;
    todo: Todo;
}

const HeatBar = ({ period, style, todo }: HeatBarProps) => {
    return <View style={style}></View>;
};

const styles = StyleSheet.create({
    heatBar: {
        width: 18,
        height: 18,
    },
    oneWeekHeatBap: {
        width: 36,
        height: 36,
    },
    noneCompleted: {
        opacity: 0.2,
    },
    completed30Percent: {
        opacity: 0.5,
    },
    mostlyCompleted: {
        opacity: 0.8,
    },
    allTasksCompleted: {
        opacity: 1.0,
    },
});
export default HeatBar;
