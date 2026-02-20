import React from "react";
import { StyleSheet, View } from "react-native";

const CalendarHeatmap = () => {
    return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    heatBar: {
        width: 18,
        height: 18,
        color: "hsl(120 60% 60%)",
    },
});

export default CalendarHeatmap;
