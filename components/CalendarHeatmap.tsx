import { TZDate } from "@date-fns/tz";
import { format, subDays, subMonths } from "date-fns";
import { randomUUID } from "expo-crypto";
import { useState } from "react";
import { View } from "react-native";

import { timePeriods } from "@/constants/const";
import { TimePeriod, Todo } from "@/constants/types";
import { layoutStyles } from "@/styles/layout";

import { useThemeColors } from "@/hooks/useThemeColors";
import { useTodosStore } from "@/store/todosStore";

import DropDown from "./DropDown";
import TodoHeatbar from "./TodoHeatbar";
import Paragraph from "./typography/Paragraph";

const CalendarHeatmap = () => {
    const [period, setPeriod] = useState<TimePeriod>(timePeriods[0]);
    const getTodos = useTodosStore((state) => state.getTodosByPeriod);
    const colors = useThemeColors();
    const currDate = new Date();

    const getPeriodLookup = () => {
        switch (period) {
            case "week":
                return subDays(currDate, 6);
            case "month":
                return subDays(currDate, 29);
            case "3 months":
                return subDays(subMonths(currDate, 2), 29);
            case "year":
                return subMonths(currDate, 11);
        }
    };

    const getBarDims = () => {
        switch (period) {
            case "week":
                return [36, 1];
            default:
                return [14, 7];
        }
    };

    // const periodLookup = getPeriodLookup();
    const [barWidth, columnHeight] = getBarDims();

    // const todos = getTodos("finished", periodLookup, currDate);
    const todos: Record<string, Todo[]>[] = [
        {
            [format(subDays(new TZDate(), 1), "MM-dd-yy")]: [
                {
                    id: randomUUID(),
                    timestamp: subDays(new TZDate(), 1).toString(),
                    title: "Wash my hands",
                    description:
                        "Everyday I forget to wash my hands and get infected real quick. So, I need to make a habit of washing my hands just right after entering my home",
                },
                {
                    id: randomUUID(),
                    timestamp: subDays(new TZDate(), 1).toString(),
                    title: "Clean my bookshelf",
                    description: "Just little reordering of my books",
                },
                {
                    id: randomUUID(),
                    timestamp: subDays(new TZDate(), 1).toString(),
                    title: "Wash my hands",
                    description:
                        "Everyday I forget to wash my hands and get infected real quick. So, I need to make a habit of washing my hands just right after entering my home",
                },
                {
                    id: randomUUID(),
                    timestamp: subDays(new TZDate(), 1).toString(),
                    title: "Clean my bookshelf",
                    description: "Just little reordering of my books",
                },
            ],
        },
    ];
    const containerStyles =
        period === "week"
            ? [layoutStyles.flexRow, layoutStyles.gapMd]
            : [layoutStyles.flexCol, layoutStyles.gapSm];

    return (
        <View
            style={[
                layoutStyles.wFull,
                layoutStyles.borderMd,
                layoutStyles.flexCol,
                layoutStyles.borderMd,
                layoutStyles.pdMd,
                {
                    backgroundColor: colors.surface[1],
                    outlineWidth: 3,
                    outlineColor: colors.shadow,
                    outlineOffset: 1,
                },
            ]}
        >
            <View
                style={[
                    layoutStyles.flexRow,
                    layoutStyles.spaceBetween,
                    layoutStyles.alignCenter,
                ]}
            >
                <Paragraph>Select Period</Paragraph>
                <DropDown
                    data={timePeriods}
                    selected={period}
                    setSelected={setPeriod}
                />
            </View>
            <View style={[layoutStyles.flexWrap, ...containerStyles]}>
                {todos.map((todos) => {
                    let key = Object.keys(todos)[0];
                    return (
                        <TodoHeatbar
                            key={key}
                            todos={todos[key]}
                            dateInDayFormat={key}
                            style={{
                                width: barWidth,
                                height: barWidth,
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default CalendarHeatmap;
