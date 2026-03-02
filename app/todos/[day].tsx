import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TodoDescPage = () => {
    const { day } = useLocalSearchParams();
    console.log(day);
    return (
        <View>
            <Text>TodoPage</Text>
        </View>
    );
};

export default TodoDescPage;
