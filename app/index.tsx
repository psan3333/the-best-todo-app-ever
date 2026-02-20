import CalendarHeatmap from "@/components/CalendarHeatmap";
import { StyleSheet, View } from "react-native";

export default function Index() {
    return (
        <View>
            <CalendarHeatmap />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
    },
});
