import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isHighFailure: boolean;
};

//Displays campaign health indicator.
//Green = Healthy
//Red = High Failure

export default function StatusBadge({ isHighFailure }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Ionicons
        name={isHighFailure ? "warning" : "checkmark-circle"}
        size={14}
        color={isHighFailure ? "#991B1B" : "#166534"}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: isHighFailure ? "#991B1B" : "#166534",
        }}
      >
        {isHighFailure ? "HIGH FAILURE" : "HEALTHY"}
      </Text>
    </View>
  );
}
