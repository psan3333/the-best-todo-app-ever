import CalendarHeatmap from "@/components/CalendarHeatmap";
import { commonStyles } from "@/styles/commonStyles";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
    return (
        <ScrollView style={[commonStyles.flexCol, styles.spaceBetweenItems]}>
            <CalendarHeatmap />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    spaceBetweenItems: {
        gap: 24,
    },
});
