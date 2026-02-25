import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Typography } from "../styles/typography";
import { Colors } from "../styles/colors";
import { Layout } from "../styles/layouts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

//Route typing for Biometrics screen.
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Biometrics"
>;

export default function BiometricsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const handleBiometricAuth = async () => {
    // Check if device supports biometrics
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert("Biometrics not supported on this device");
      return;
    }

    // Check if biometrics are enrolled
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert("No Face ID / Touch ID enrolled");
      return;
    }

    // Trigger biometric authentication prompt
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access Campaign Monitor",
      fallbackLabel: "Use Passcode",
    });
    //Handle authentication result
    if (result.success) {
      navigation.navigate("Dashboard" as never);
    } else {
      Alert.alert("Authentication failed");
    }
  };
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={Layout.container}>
        <View style={Layout.heroWrapper}>
          <View style={Layout.heroContainer}>
            {/* Headline */}
            <View style={{ width: "100%", justifyContent: "center" }}>
              <Text style={styles.title}>SECURITY</Text>
              <Text style={styles.title}>CHECK</Text>
            </View>

            {/* Illustration */}
            <Image
              source={require("../../assets/images/face-scan.png")}
              style={styles.heroImage}
            />

            {/* Authenticate Button */}
            <Pressable onPress={handleBiometricAuth} style={Layout.button}>
              <Text style={Layout.buttonText}>Authenticate</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  heroImage: {
    alignSelf: "center",
    width: 280,
    height: 240,
    resizeMode: "contain",
    zIndex: 2,
    marginTop: 50,
  },

  title: {
    textAlign: "center",
    ...Typography.title,
    color: Colors.primary,
  },
});
