// styles/layout.ts
import { StyleSheet, Dimensions, Platform } from "react-native";
import { Typography } from "../styles/typography";
import { Colors } from "../styles/colors";

export const Layout = StyleSheet.create({
  // container and wrapper of the system
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
    width: "100%",
  },

  heroWrapper: {
    marginTop: 0,
    width: "90%",
    alignSelf: "center",
  },

  heroContainer: {
    alignItems: "center",
    gap: 15,
  },

  container_inner: {
    flex: 1,
    backgroundColor: Colors.main_background,
  },

  scrollContent: {
    alignItems: "center",
  },
  //Button styles
  button: {
    backgroundColor: "#47CAF0",
    padding: 15,
    borderRadius: 10,
    width: "50%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    // shadow (Android)
    elevation: 6,
  },

  buttonText: {
    ...Typography.normal_word_bold,
    color: "#FFF",
    textAlign: "center",
  },

  //box style
  box: {
    borderRadius: 10,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    // shadow (Android)
    elevation: 6,
  },

  //back button style
  back: {
    marginLeft: 10,
  },

  //header row style
  headerRow: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
    flexDirection: "row",
    gap: 10,
  },
  headerTitle: {
    ...Typography.normal_title,
    color: Colors.primary,
  },
});
