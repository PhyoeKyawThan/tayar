import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const MusicPlayer = () => {
    const musicTitle = useLocalSearchParams().musicTitle;
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: "none"},
            HeaderRight: () => {
                return (
                    <View>
                        <Ionicons name="home" style={{ color: "#000" }} onPress={() => navigation.goBack()} />
                            <Text>Home</Text>
                    </View>
                );
            }
        })
    }, [navigation])
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{musicTitle}</Text>
        </View>
    );
}

export default MusicPlayer;