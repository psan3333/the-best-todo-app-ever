import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { TimePeriod } from "@/constants/types";
import { layoutStyles } from "@/styles/layout";

import { useThemeColors } from "@/hooks/useThemeColors";

import { typography } from "@/styles/typography";
import { getHeatMapBars, getPeriodLookup } from "@/utils/utils";
import { TZDate } from "@date-fns/tz";

import { useDB } from "@/hooks/useDB";
import DropDown from "./pressable/DropDown";
import TodoHeatbar from "./TodoHeatbar";
import Heading from "./typography/Heading";

const CalendarHeatmap = () => {
    const [period, setPeriod] = useState<TimePeriod>("week");
    const [gapBetweenBars, setGapBetweenBars] = useState(layoutStyles.gapSm);

    const db = useDB();
    const heatmapViewRef = useRef<View>(null);
    const themeColors = useThemeColors();

    const containerStyles = useMemo(
        () => [
            layoutStyles.wHalfLayoutContainer,
            layoutStyles.borderMd,
            layoutStyles.flexCol,
            layoutStyles.alignCenter,
            layoutStyles.borderMd,
            layoutStyles.pdMd,
            layoutStyles.gapMd,
            {
                backgroundColor: themeColors.surface[1],
                outlineWidth: 2,
                outlineColor: themeColors.outline,
                outlineOffset: 1,
            },
        ],
        [themeColors.outline, themeColors.surface],
    );

    const heatbarWidth = useMemo(() => {
        let style = styles.heatbarLg;
        if (period !== "week" && period !== "month") style = styles.heatbarSm;
        return style;
    }, [period]);

    useEffect(() => {
        setGapBetweenBars({
            gap: Math.floor(
                (heatmapViewRef.current!.clientWidth - heatbarWidth.width * 7) /
                    6,
            ),
        });
    }, [heatbarWidth]);

    const bars = useMemo(() => {
        const todos = db.getTodosByPeriodAndType(period, "finished");
        const lookupDate = getPeriodLookup(new TZDate(), period);
        const barsData = getHeatMapBars(lookupDate, todos);
        return (
            <>
                {barsData.map((item) => {
                    const day = Object.keys(item)[0];
                    return (
                        <TodoHeatbar
                            key={day}
                            style={heatbarWidth}
                            todos={item[day]}
                            dateInDayFormat={day}
                        />
                    );
                })}
            </>
        );
    }, [db, heatbarWidth, period]);

    return (
        <View style={containerStyles}>
            <View
                ref={heatmapViewRef}
                style={[
                    layoutStyles.wFull,
                    layoutStyles.flexRow,
                    layoutStyles.spaceBetween,
                    layoutStyles.gapMd,
                    layoutStyles.alignCenter,
                ]}
            >
                <Heading style={typography.textMd}>Select Period</Heading>
                <DropDown
                    data={["week", "month"]}
                    selected={period}
                    setSelected={setPeriod}
                />
            </View>
            <View
                style={[
                    period === "week" || period === "month"
                        ? layoutStyles.flexRow
                        : layoutStyles.flexCol,
                    !(period === "week" || period === "month") && {
                        height:
                            layoutStyles.gapXs.gap * 6 + heatbarWidth.width * 7,
                    },
                    layoutStyles.flexWrap,
                    layoutStyles.contentBox,
                    gapBetweenBars,
                ]}
            >
                {bars}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heatbarLg: {
        height: 36,
        width: 36,
    },
    heatbarMd: {
        height: 24,
        width: 24,
    },
    heatbarSm: {
        height: 16,
        width: 16,
    },
});

export default CalendarHeatmap;
