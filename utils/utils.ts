import { TimePeriod, Todo } from "@/constants/types";
import { TZDate } from "@date-fns/tz";
import {
    addDays,
    compareAsc,
    format,
    isSameDay,
    subDays,
    subMonths,
} from "date-fns";

export const getPeriodLookup = (currDate: TZDate, period: TimePeriod) => {
    switch (period) {
        case "today":
            return currDate;
        case "week":
            return subDays(currDate, 6);
        case "month":
            return subDays(currDate, 29);
        case "year":
            return subMonths(currDate, 11);
        default:
            // default - week
            return subDays(currDate, 6);
    }
};

export const getHeatMapBars = (startDate: TZDate, todos: Todo[]) => {
    const dayFormat = "dd-MM-yy";
    const dayMapping: Record<string, Todo[]> = {};
    const currDate = new TZDate(new Date(), startDate.timeZone);
    if (todos.length === 0) {
        // Return empty bars from startDate to currDate
        let result: Record<string, Todo[]>[] = [];
        for (
            let start = startDate;
            compareAsc(start, currDate) <= 0;
            start = addDays(start, 1)
        ) {
            result.push({ [format(start, dayFormat)]: [] });
        }
        return result;
    }

    let currentDay = todos[0].changedAt;
    let formattedDay = format(currentDay, dayFormat);
    for (let todo of todos) {
        if (!isSameDay(todo.changedAt, currentDay)) {
            currentDay = todo.changedAt;
            formattedDay = format(currentDay, dayFormat);
        }
        if (formattedDay in dayMapping) dayMapping[formattedDay].push(todo);
        else dayMapping[formattedDay] = [todo];
    }

    let result: Record<string, Todo[]>[] = [];
    for (
        let start = startDate;
        compareAsc(start, currDate) <= 0;
        start = addDays(start, 1)
    ) {
        formattedDay = format(start, dayFormat);
        if (!(formattedDay in dayMapping)) {
            result.push({
                [formattedDay]: [],
            });
        } else result.push({ [formattedDay]: dayMapping[formattedDay] });
    }
    return result;
};
