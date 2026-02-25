import { useThemeColors } from "@/hooks/useThemeColors";
import { commonStyles } from "@/styles/commonStyles";
import React, { SetStateAction, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface DropDownProps {
    data: string[];
    selected: string;
    setSelected: React.Dispatch<SetStateAction<any>>;
}

const DropDownItem = ({
    value,
    onPress,
}: {
    value: string;
    onPress: () => void;
}) => {
    return (
        <Text
            key={`${Math.random() * 1000000}`}
            style={styles.item}
            onPress={() => onPress()}
        >
            {value}
        </Text>
    );
};

const DropDown = ({ data, selected, setSelected }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useThemeColors();

    return (
        data.length > 0 && (
            <View>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? theme.button.pressed
                                : theme.button.default,
                        },
                    ]}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text style={[styles.item, styles.pressableStyles]}>
                        {selected}
                    </Text>
                </Pressable>
                {isOpen && (
                    <ScrollView
                        style={[
                            commonStyles.absolute,
                            commonStyles.elementBelow,
                            styles.scrollStyles,
                        ]}
                    >
                        {data.map(
                            (val, index) =>
                                val !== selected && (
                                    <DropDownItem
                                        key={index}
                                        value={val}
                                        onPress={() => {
                                            setSelected(val);
                                            setIsOpen(false);
                                        }}
                                    />
                                ),
                        )}
                    </ScrollView>
                )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    item: {
        width: 150,
        height: 48,
        fontSize: 24,
    },
    pressableStyles: {
        borderWidth: 2,
        borderColor: "black",
    },
    scrollStyles: {
        height: 150,
        borderWidth: 2,
        borderColor: "black",
    },
});

export default DropDown;
