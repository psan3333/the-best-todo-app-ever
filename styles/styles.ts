import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    spaceBetween: {
        justifyContent: "space-between",
    },
    spaceAround: {
        justifyContent: "space-around",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
    },
})