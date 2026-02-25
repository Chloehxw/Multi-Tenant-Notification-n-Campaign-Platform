import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

import { Typography } from "../styles/typography";
import { Colors } from "../styles/colors";
import { Layout } from "../styles/layouts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Route typing for Biometrics screen.
//incoming data
type PushPreviewRouteProp = RouteProp<RootStackParamList, "PushPreview">;
//outgoing navigation
type PushPreviewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PushPreview"
>;

type Props = {
  route: PushPreviewRouteProp;
};

export default function PushPreviewScreen({ route }: Props) {
  const navigation = useNavigation<PushPreviewNavigationProp>();
  // Extract dynamic notification content from navigation params
  const { title, body } = route.params;
  // Controls collapsed / expanded notification state
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#EFEEF5" }}
    >
      {/* Header with back navigation */}
      <View style={Layout.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={Layout.back}>
          <Ionicons name="chevron-back" size={24} color="#1E40AF" />
        </Pressable>

        <Text style={Layout.headerTitle}>Preview</Text>
      </View>
      <ScrollView
        style={Layout.container_inner}
        contentContainerStyle={Layout.scrollContent}
        showsVerticalScrollIndicator
      >
        {/* Toggle collapsed / expanded preview mode */}
        <View style={Layout.heroWrapper}>
          <View style={Layout.heroContainer}>
            <View style={styles.toggleRow}>
              <Text>Collapsed View</Text>
              <Switch value={collapsed} onValueChange={setCollapsed} />
            </View>
            <View style={Layout.box}>
              <Text style={styles.appName}>Campaign Monitor</Text>

              <Text style={styles.title}>{title}</Text>

              <Text
                numberOfLines={collapsed ? 1 : undefined}
                style={styles.body}
              >
                {body}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  notificationCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  appName: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: "#374151",
  },
});
