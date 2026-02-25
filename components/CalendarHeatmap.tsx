import { subDays, subMonths } from "date-fns";
import { useState } from "react";
import { Text, View } from "react-native";

import { timePeriods } from "@/constants/const";

import { useTodosStore } from "@/store/todosStore";
import { commonStyles } from "@/styles/commonStyles";

import DropDown from "./DropDown";
import HeatBar from "./HeatBar";

const CalendarHeatmap = () => {
    const [period, setPeriod] = useState<string>(timePeriods[0]);
    const getTodos = useTodosStore((state) => state.getTodos);
    const currDate = new Date();

    const getPeriodLookup = () => {
        switch (period) {
            case "week":
                return subDays(currDate, 6);
            case "month":
                return subDays(currDate, 24);
            case "3 months":
                return subDays(subMonths(currDate, 2), 15);
            case "year":
                return subMonths(currDate, 11);
        }
        return subDays(currDate, 6);
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
        return 7;
    };

    const getBarDims = () => {
        switch (period) {
            case "week":
                return [36, 1];
            default:
                return [14, 7];
        }
    };

    let periodLookup = getPeriodLookup();
    let numberOfBars = getNumberOfBars();
    let [barWidth, columnHeight] = getBarDims();
    const todos = getTodos(periodLookup, currDate);
    let layoutStyles =
        period === "week"
            ? [commonStyles.flexRow, commonStyles.gapSm]
            : [commonStyles.flexCol, commonStyles.gapMd];

    return (
        <View style={commonStyles.flexCol}>
            <View style={[commonStyles.flexRow, commonStyles.spaceBetween]}>
                <Text>Select Period</Text>
                <DropDown
                    data={timePeriods}
                    selected={period}
                    setSelected={setPeriod}
                />
            </View>
            <View style={[commonStyles.flexWrap, ...layoutStyles]}>
                {todos.map((todo) => (
                    <HeatBar key={todo.id} />
                ))}
            </View>
        </View>
    );
};

export default CalendarHeatmap;
