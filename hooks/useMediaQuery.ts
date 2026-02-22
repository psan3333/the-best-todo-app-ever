import { useWindowDimensions } from "react-native";

type MediaQuery = {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}

export const useMediaQuery = (query: MediaQuery) => {
    const { width, height } = useWindowDimensions();
}