import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
  <Tabs screenOptions={{
    // headerShown: false,
    tabBarActiveTintColor: "#673ab7",
    tabBarInactiveTintColor: "#999",
    tabBarStyle: {
      backgroundColor: "#fff",
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    tabBarLabelStyle: { fontSize: 12, paddingBottom: 5, paddingTop: 5, textTransform: "none" },
    tabBarIconStyle: { paddingBottom: 5, paddingTop: 5 },
    tabBarItemStyle: { flexDirection: "column", alignItems: "center", justifyContent: "center" }
  }}>
    <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon(props) {
        return <Ionicons name="home" size={props.size} color={props.color} />;
    },  }} />
    <Tabs.Screen name="about" options={{ title: "About", tabBarIcon(props) {
        return <Ionicons name="information-circle" size={props.size} color={props.color} />;
    }, }} />
  </Tabs> 
  );
}
