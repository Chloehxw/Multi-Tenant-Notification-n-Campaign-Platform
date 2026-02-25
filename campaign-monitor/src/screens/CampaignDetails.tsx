import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Typography } from "../styles/typography";
import { Colors } from "../styles/colors";
import { Layout } from "../styles/layouts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { calculateFailureRate } from "../utils/calculateFailure";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MetricCircle from "../components/MetricCircle";
import StatusBadge from "../components/StatusBadge";

//Route typing for Campaign Detail screen.
type CampaignDetailRouteProp = RouteProp<RootStackParamList, "CampaignDetail">;

type CampaignDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CampaignDetail"
>;

type Props = {
  route: CampaignDetailRouteProp;
};

export default function CampaignDetailScreen({ route }: Props) {
  const navigation = useNavigation<CampaignDetailNavigationProp>();
  const { campaign } = route.params;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#EFEEF5" }}
    >
      {/* Displays detailed campaign metrics */}
      <View style={Layout.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={Layout.back}>
          <Ionicons name="chevron-back" size={24} color="#1E40AF" />
        </Pressable>

        <Text style={Layout.headerTitle}>{campaign.name}</Text>
      </View>
      <ScrollView
        style={Layout.container_inner}
        contentContainerStyle={Layout.scrollContent}
        showsVerticalScrollIndicator
      >
        <View style={Layout.heroWrapper}>
          <View style={Layout.heroContainer}>
            {(() => {
              const failureRate = calculateFailureRate(
                campaign.sent,
                campaign.failed,
              );

              const isHighFailure = failureRate >= 0.2;

              return (
                <View style={Layout.box}>
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
                </View>
              );
            })()}
            {/* Notification Customization Section */}
            <View style={Layout.box}>
              <Text style={styles.notiTitle}>Customize Notifications</Text>
              <View style={styles.divider} />
              <View style={{ gap: 10, marginTop: 10 }}>
                <View style={styles.inputRow}>
                  <Text style={styles.campaignText}>Title: </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
                <View style={styles.bodyRow}>
                  <Text style={styles.campaignText}>Body: </Text>

                  <TextInput
                    style={styles.bodyInput}
                    placeholder="Enter body"
                    value={body}
                    onChangeText={setBody}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Pressable
                    // onPress={handleBiometricAuth}
                    onPress={() =>
                      navigation.navigate("PushPreview", {
                        title: title,
                        body: body,
                      })
                    }
                    style={Layout.button}
                  >
                    <Text style={Layout.buttonText}>Preview</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            {/* CTA Buttons */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  notiTitle: {
    ...Typography.big_word_bold,
    color: Colors.primary,
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: Colors.primary,
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  bodyRow: {
    gap: 12,
  },
  bodyInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
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
