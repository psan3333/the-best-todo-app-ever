import { DBCache } from "@/constants/types";
import drizzleDB from "@/db";
import * as schema from "@/db/schema";
import { getPeriodLookup } from "@/utils/utils";
import { TZDate } from "@date-fns/tz";
import { endOfDay, startOfDay } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo } from "react";

export const useDBCache = (): DBCache => {
    const currDate = useMemo(() => new TZDate(), []);
    const startOfToday = useMemo(() => startOfDay(currDate), [currDate]);
    const endOfToday = useMemo(() => endOfDay(currDate), [currDate]);
    const week = useMemo(() => getPeriodLookup(currDate, "week"), [currDate]);
    const month = useMemo(() => getPeriodLookup(currDate, "month"), [currDate]);
    const year = useMemo(() => getPeriodLookup(currDate, "year"), [currDate]);
    const { data: plannedToday } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, endOfToday),
                    gte(schema.userTodo.changedAt, startOfToday),
                    eq(schema.userTodo.type, "planned"),
                ),
            ),
    );
    const { data: plannedThisWeek } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, currDate),
                    gte(schema.userTodo.changedAt, week),
                    eq(schema.userTodo.type, "planned"),
                ),
            ),
    );
    const { data: plannedThisMonth } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, currDate),
                    gte(schema.userTodo.changedAt, month),
                    eq(schema.userTodo.type, "planned"),
                ),
            ),
    );
    const { data: plannedThisYear } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, currDate),
                    gte(schema.userTodo.changedAt, year),
                    eq(schema.userTodo.type, "planned"),
                ),
            ),
    );

    const { data: finishedToday } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, endOfToday),
                    gte(schema.userTodo.changedAt, startOfToday),
                    eq(schema.userTodo.type, "finished"),
                ),
            ),
    );
    const { data: finishedThisWeek } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, currDate),
                    gte(schema.userTodo.changedAt, week),
                    eq(schema.userTodo.type, "finished"),
                ),
            ),
    );
    const { data: finishedThisMonth } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, currDate),
                    gte(schema.userTodo.changedAt, month),
                    eq(schema.userTodo.type, "finished"),
                ),
            ),
    );
    const { data: finishedThisYear } = useLiveQuery(
        drizzleDB
            .select()
            .from(schema.userTodo)
            .where(
                and(
                    lte(schema.userTodo.changedAt, currDate),
                    gte(schema.userTodo.changedAt, year),
                    eq(schema.userTodo.type, "finished"),
                ),
            ),
    );

    return {
        todayData: {
            planned: plannedToday,
            finished: finishedToday,
        },
        weekData: {
            planned: plannedThisWeek,
            finished: finishedThisWeek,
        },
        monthData: {
            planned: plannedThisMonth,
            finished: finishedThisMonth,
        },
        yearData: {
            planned: plannedThisYear,
            finished: finishedThisYear,
        },
    };
};
