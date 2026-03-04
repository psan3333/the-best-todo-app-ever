import CalendarHeatmap from "@/components/CalendarHeatmap";
import { layoutStyles } from "@/styles/layout";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
    return (
        <ScrollView
            contentContainerStyle={[
                layoutStyles.flexRow,
                layoutStyles.flexWrap,
                layoutStyles.alignCenter,
                layoutStyles.appContainer,
                layoutStyles.pdSm,
                styles.spaceBetweenItems,
            ]}
        >
            <CalendarHeatmap />
            <CalendarHeatmap />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    spaceBetweenItems: {
        gap: 24,
    },
});
