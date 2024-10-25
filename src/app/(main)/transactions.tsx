import TransactionScreen from "@/src/screens/TransactionScreen";
import { View } from "tamagui";

// style
import { COLORS } from "@/src/constants";

export default function Tab() {
  return (
    <>
      <View px={22} bg={COLORS.bg} flex={1}>
        <TransactionScreen />
      </View>
    </>
  );
}
