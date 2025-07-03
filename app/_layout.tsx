import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function MusicPlayer() {
    const { musicTitle } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // tabBarStyle: { display: 'none' },
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                    <Ionicons name="home" size={24} color="#000" onPress={() => navigation.goBack()} />
                    <Text style={{ marginLeft: 5 }}>Home</Text>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{musicTitle}</Text>
        </View>
    );
}
