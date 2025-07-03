import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MusicListItemProps {
  title?: string;
  isPlaying?: boolean;
  onPress: () => void;
}

export default function MusicListItem(props: MusicListItemProps) {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>{props.title}</Text>
      <Text>
        {props.isPlaying ?
          <TouchableOpacity style={styles.icon} onPress={props.onPress}>
            <Ionicons color="white" name="pause" size={24} />
          </TouchableOpacity>
          : <TouchableOpacity style={styles.icon} onPress={props.onPress}>
            <Ionicons size={24} color="white" name="play" />
          </TouchableOpacity>}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    color: "white",
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#6b6e49",
  },
});