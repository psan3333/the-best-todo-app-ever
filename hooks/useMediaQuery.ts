import { StyleProp, TextStyle, useWindowDimensions, ViewStyle } from "react-native";

type MediaQueryType = "minWidth" | "maxWidth" | "minHeight" | "maxHeight";
type MediaQuery = {
    query: MediaQueryType;
    value: number;
};

export const useMediaQuery = (queries: MediaQuery[], style: StyleProp<TextStyle | ViewStyle>) => {
    const { width, height } = useWindowDimensions();

    const checkIfQuerySatisfies = (key: MediaQueryType, value: number) => {
        switch (key) {
            case "minWidth":
                return value >= width;
            case "maxWidth":
                return value <= width;
            case "minHeight":
                return value >= height;
            case "maxHeight":
                return value <= height;
            default:
                throw new Error("useMediaQuery: Wrong query name!");
        }
    }

    let querySatisfied: boolean = true;
    for (let { query, value } of queries) {
        // key is guarantied to have QueryType from hook parameter type
        querySatisfied &&= checkIfQuerySatisfies(query, value);
    }

    return querySatisfied ? style : {};
}