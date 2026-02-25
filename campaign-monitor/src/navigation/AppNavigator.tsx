import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BiometricsScreen from "../screens/Biometrics";
import DashboardScreen from "../screens/Dashboard";
import CampaignDetailScreen from "../screens/CampaignDetails";
import PushPreviewScreen from "../screens/PushNotification";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
//Main application navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Biometrics (entry gate for security) */}
      <Stack.Screen name="Biometrics" component={BiometricsScreen} />
      {/* Dashboard (main campaign overview) */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/*  CampaignDetail (campaign-specific details & notification customization) */}
      <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
      {/* PushPreview (simulated notification preview screen) */}
      <Stack.Screen name="PushPreview" component={PushPreviewScreen} />
    </Stack.Navigator>
  );
}
