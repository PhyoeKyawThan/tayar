import { View, Text } from "react-native";

export default function About() {
    return (
        <View
            style={{    
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>About this app</Text>
            <Text>This app is built with Expo Router.</Text>
            <Text>Check out the documentation at https://expo.github.io/router.</Text>
        </View>);
}