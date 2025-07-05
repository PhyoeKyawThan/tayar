import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleAlign: "center",
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/[id]" options={{ title: "",headerShown: true }} />
      </Stack>
    </>
  );
}
