import BText from "@/components/BText";
import BView from "@/components/BView";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <BView style={styles.container}>
        <BText type="title">This screen doesn't exist.</BText>

        <BText
          href="/"
          type="link"
          style={styles.link}
        >
          Go to home screen!
        </BText>
      </BView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
