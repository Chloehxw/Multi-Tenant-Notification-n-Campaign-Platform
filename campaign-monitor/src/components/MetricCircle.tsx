import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  value: number;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
};

//Reusable metric display component.
//Used to display Sent, Failed, and Pending values.

export default function MetricCircle({
  label,
  value,
  borderColor,
  backgroundColor,
  textColor,
}: Props) {
  return (
    <View style={[styles.circle, { borderColor, backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
});
