import CalendarHeatmap from "@/components/CalendarHeatmap";
import GraphicalStats from "@/components/GraphicalStats";
import GridRow from "@/components/GridRow";
import TodoListContainer from "@/components/TodoListContainer";
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
            <GridRow style={{ maxHeight: "50%" }}>
                <TodoListContainer />
            </GridRow>
            <GridRow style={{ flex: 1 }}>
                <CalendarHeatmap />
                <GraphicalStats />
            </GridRow>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    spaceBetweenItems: {
        gap: 24,
    },
});
