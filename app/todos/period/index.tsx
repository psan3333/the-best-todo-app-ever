import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const PlannedAndFinished = () => {
    const { period } = useLocalSearchParams();

    return (
        <View>
            <Text>PlannedAndFinished</Text>
        </View>
    );
};

export default PlannedAndFinished;
