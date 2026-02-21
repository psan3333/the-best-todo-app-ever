import { subDays, subMonths } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CalendarHeatmap = ({
    period,
}: {
    period: "week" | "month" | "3 months" | "year";
}) => {
    const data = [
        {
            date: new Date("2026-01-26"),
            tasksCompleted: 5,
        },
        {
            date: new Date("2026-01-27"),
            tasksCompleted: 5,
        },
        {
            date: new Date("2026-01-28"),
            tasksCompleted: 5,
        },
        {
            date: new Date("2026-01-29"),
            tasksCompleted: 5,
        },
    ];

    data.sort((a, b) => a.date.getTime() - b.date.getTime());

    const getPeriodLookup = () => {
        switch (period) {
            case "week":
                return subDays(new Date(), 6);
            case "month":
                return subDays(new Date(), 24);
            case "3 months":
                return subDays(subMonths(new Date(), 2), 15);
            case "year":
                return subMonths(new Date(), 11);
        }
    };

    const getNumberOfBars = () => {
        switch (period) {
            case "week":
                return 7;
            case "month":
                return 30;
            case "3 months":
                return 90;
            case "year":
                return 365;
        }
    };

    const getContainerDims = () => {
        switch (period) {
            case "week":
                return [54, 1];
            default:
                return [16, 7];
        }
    };

    let periodLookup = getPeriodLookup();
    let numberOfBars = getNumberOfBars();
    let [barWidth, columnHeight] = getContainerDims();

    return (
        <View style={styles.container}>
            <View>
                <Text>Select Period</Text>
            </View>
            <View style={styles.heatBarContainer}>{}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    selectPanel: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heatBarContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    oneWeekContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    heatBarBg: {
        color: "hsl(120 60% 60%)",
    },
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

export default CalendarHeatmap;
