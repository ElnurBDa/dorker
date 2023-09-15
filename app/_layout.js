import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/app",
};

const Layout = () => {
  return (
    <Stack initialRouteName="/app">
      <Stack.Screen name="/app" />
    </Stack>
  )
};

export default Layout;