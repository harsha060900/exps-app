import { View, Text } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
// style
import { COLORS } from "@/src/constants";
import ChartSCreen from "@/src/screens/ChartScreen/ChartScreen";
export default function Tab() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 20,
        paddingTop: 10
      }}
    >
      <ChartSCreen />
    </SafeAreaView>
  );
}
