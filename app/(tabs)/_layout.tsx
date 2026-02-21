import { Icon } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, Link, usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconType = typeof Feather & typeof MaterialIcons;
type extractGeneric<Type> = Type extends Icon<infer X, infer Y> ? X : never;

const tabRoutes = [
    {
        route: "/",
        name: "index",
        text: "Home",
        iconName: "home",
        Icon: Feather,
    },
    {
        route: "/todos",
        name: "todos/index",
        text: "Your TODO",
        iconName: "check-square",
        Icon: Feather,
    },
];

function TabBarButton({
    text,
    route,
    currPath,
    iconName,
    Icon,
}: {
    text: string;
    route: string;
    currPath: string;
    iconName: extractGeneric<IconType>;
    Icon: IconType;
}) {
    return (
        <Link href={route as Href} style={styles.tabItem} asChild>
            <Pressable>
                <Icon
                    name={iconName}
                    style={[
                        currPath === route
                            ? styles.tabActive
                            : styles.tabInactive,
                    ]}
                    size={24}
                />
                <Text
                    style={[
                        styles.tabItemText,
                        currPath === route
                            ? styles.tabActive
                            : styles.tabInactive,
                    ]}
                >
                    {text}
                </Text>
            </Pressable>
        </Link>
    );
}

export default function RootLayout() {
    const currPath = usePathname();
    return (
        <SafeAreaView
            style={{
                height: "100%",
            }}
        >
            <Tabs>
                <TabSlot />
                <TabList style={styles.tabList}>
                    {tabRoutes.map(({ route, name, text, iconName, Icon }) => (
                        <TabTrigger
                            key={`${Math.random() * 100000000}`}
                            name={name}
                            href={route as Href}
                        >
                            <TabBarButton
                                text={text}
                                route={route}
                                iconName={iconName as extractGeneric<IconType>}
                                currPath={currPath}
                                Icon={Icon as IconType}
                            />
                        </TabTrigger>
                    ))}
                </TabList>
            </Tabs>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabItemText: {
        fontSize: 12,
        opacity: 0.6,
        fontWeight: 300,
    },
    tabActive: {
        color: "green",
    },
    tabInactive: {
        color: "black",
    },
    tabList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    tabItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});
