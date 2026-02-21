import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const DropDown = ({ data }: { data: string[] }) => {
    const [value, setValue] = useState(data[0]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        data.length > 0 && (
            <View style={styles.picker}>
                <Text style={[styles.picker, {backgroundColor: }]}>{value}</Text>
                {isOpen &&
                    data.map(
                        (val, index) =>
                            val !== value && (
                                <Text
                                    key={Math.random() * 1000000}
                                    style={[
                                        styles.picker,
                                        {
                                            position: "absolute",
                                            top: styles.picker.height * index,
                                        },
                                    ]}
                                >
                                    {val}
                                </Text>
                            ),
                    )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    picker: {
        width: 200,
        height: 54,
    },
});

export default DropDown;
