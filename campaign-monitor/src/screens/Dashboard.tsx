import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Typography } from "../styles/typography";
import { Colors } from "../styles/colors";
import { Layout } from "../styles/layouts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { calculateFailureRate } from "../utils/calculateFailure";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { useCampaigns } from "../hooks/useCampaign";
import MetricCircle from "../components/MetricCircle";
import StatusBadge from "../components/StatusBadge";

//Triggers a local notification when failure rate exceeds threshold.
const triggerFailureNotification = async (
  campaignName: string,
  failureRate: number,
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "High Failure Detected",
      body: `${campaignName} failure rate is ${(failureRate * 100).toFixed(
        1,
      )}%`,
      sound: true,
    },
    trigger: null, // immediately
  });
};
export default function DashboardScreen() {
  //Route typing for Dashboard screen
  type DashboardNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Dashboard"
  >;
  const navigation = useNavigation<DashboardNavigationProp>();
  // Load campaigns using custom hook (API + SQLite caching)
  const { campaigns, loading, offline, refresh } = useCampaigns();

  // Prevent duplicate notifications
  const notifiedCampaigns = useRef<Set<string>>(new Set());

  //Monitor campaigns and trigger alert
  useEffect(() => {
    campaigns.forEach((campaign) => {
      const failureRate = calculateFailureRate(campaign.sent, campaign.failed);

      if (failureRate >= 0.2 && !notifiedCampaigns.current.has(campaign.id)) {
        triggerFailureNotification(campaign.name, failureRate);
        notifiedCampaigns.current.add(campaign.id);
      }
    });
  }, [campaigns]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#EFEEF5" }}
    >
      {/* Dashboard Header */}
      <View style={styles.headerRow}>
        <Text style={Layout.headerTitle}>Dashboard</Text>
      </View>
      {/* Campaign List with Pull-to-Refresh */}
      <ScrollView
        style={Layout.container_inner}
        contentContainerStyle={Layout.scrollContent}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      >
        <View style={Layout.heroWrapper}>
          <View style={Layout.heroContainer}>
            {/* Offline Indicator */}
            {offline && (
              <Text style={{ color: "red", textAlign: "center" }}>
                Offline Mode (Loaded from Cache)
              </Text>
            )}
            {/* Render Campaign Cards */}
            {campaigns.map((campaign) => {
              const failureRate = calculateFailureRate(
                campaign.sent,
                campaign.failed,
              );

              const isHighFailure = failureRate >= 0.2;

              return (
                <Pressable
                  key={campaign.id}
                  onPress={() =>
                    navigation.navigate("CampaignDetail", {
                      campaign: campaign,
                    })
                  }
                  style={Layout.box}
                >
                  <View style={styles.titleRow}>
                    <View>
                      <Text style={styles.idText}>
                        Tenant ID: {campaign.tenantId}
                      </Text>
                      <Text style={styles.campaignText}>{campaign.name}</Text>
                    </View>

                    <StatusBadge isHighFailure={isHighFailure} />
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.statusRow}>
                    <MetricCircle
                      label="Sent"
                      value={campaign.sent}
                      borderColor="#3B82F6"
                      backgroundColor="#DBEAFE"
                      textColor="#1E40AF"
                    />

                    <MetricCircle
                      label="Failed"
                      value={campaign.failed}
                      borderColor="#EF4444"
                      backgroundColor="#FEE2E2"
                      textColor="#991B1B"
                    />

                    <MetricCircle
                      label="Pending"
                      value={campaign.pending}
                      borderColor="#F59E0B"
                      backgroundColor="#FEF3C7"
                      textColor="#92400E"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
  headerRow: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
  },

  idText: {
    ...Typography.normal_word,
    color: Colors.text_grey,
    marginBottom: 3,
  },
  campaignText: {
    ...Typography.normal_word,
    color: Colors.primary,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
});
