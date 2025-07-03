import MusicListItem from "@/components/MusicListView";
import usePlayer from "@/utils/Player";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AudioPlayer } from "expo-audio";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// static mapping for local audio files
const musicFiles = [
  {
    "title": "Car outside",
    "file": require("../../assets/musics/caroutside.mp3"),
  },
  {
    "title": "Say U Won't let go",
    "file": require("../../assets/musics/sayuwontletgo.mp3")
  },
];

interface PlayerType {
  playAudio: () => Promise<void>;
  pauseAudio: () => Promise<void>;
  isPlaying: boolean;
  player: AudioPlayer;
}

export default function Index() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);

  const players = musicFiles.map(music => usePlayer(music.file));


  function handleModalPress() {
    currentPlayer?.player.playing ? currentPlayer.pauseAudio() : currentPlayer?.playAudio();
  }

  function handlePlayPause(index: number) {
    if (currentPlayerIndex === -1) {
      // If the current player is the same as the one being pressed, pause it
      players[index].playAudio();
      setCurrentPlayerIndex(index);
      setCurrentPlayer(players[index]);
      return;
    }
    if (currentPlayerIndex === index) {
      // If the current player is the same as the one being pressed, pause it
      players[index].player.playing ? players[index].pauseAudio() : players[index].playAudio();
      setCurrentPlayer(players[index]);
      return;
    }
    if (currentPlayerIndex !== index) {
      // If the current player is different, pause the current one and play the new one
      players[index] && players[currentPlayerIndex]?.pauseAudio();
      players[index].playAudio();
      setCurrentPlayerIndex(index);
      setCurrentPlayer(players[index]);
      return;
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, padding: 20, marginTop: 0 }}>
        {musicFiles.map((music, index) => {
          return (
            <TouchableOpacity  key={index}>
              <MusicListItem
                key={index}
                title={music.title}
                isPlaying={players[index].isPlaying}
                onPress={() => handlePlayPause(index)}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {currentPlayer &&
        <View style={styles.modal}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <Text>{currentPlayerIndex !== -1 ? musicFiles[currentPlayerIndex].title : "None"}</Text>

            <View>
              {currentPlayerIndex !== -1 && (
                <Pressable onPress={handleModalPress} style={styles.icon} >{
                  players[currentPlayerIndex].isPlaying
                    ? <Ionicons name="pause" size={24} color="white" />
                    : <Ionicons name="play" size={24} color="white" />}
                </Pressable>
              )}
            </View>

          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    // paddingTop: 20,
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    transitionDelay: "0.3s",
  },
  icon: {
    color: "white",
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#6b6e49",
  },
});