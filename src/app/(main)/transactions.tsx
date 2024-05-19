import TransactionScreen from "@/src/screens/TransactionScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, Text, YStack, View } from "tamagui";
import { Stack, router } from "expo-router";
// style
import { COLORS } from "@/src/constants";
// Icons
import { Ionicons } from "@expo/vector-icons";

export default function Tab() {
  return (
    <>
      <View  px={22} bg={COLORS.bg} flex={1} >
        <TransactionScreen />
      </View>
    </>
  );
}
