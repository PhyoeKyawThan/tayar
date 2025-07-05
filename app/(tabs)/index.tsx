import musicFiles from "@/assets/audioLists";
import { usePlayerStore } from "@/utils/PlayerStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AudioSource, useAudioPlayer } from "expo-audio";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {

    const currentRef = useRef(-1);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
    const [currentPauseIndex, setCurrentPauseIndex] = useState(-1);
    const currentSourceRef = useRef<AudioSource | null>(null);
    const player = useAudioPlayer(null);
    const currentAudioIndex = usePlayerStore((state) => state.currentAudioIndex);
    // TODO:\\: need to fix background audio between tabs and screens 
    // if(currentAudioIndex != null ) {
    //     handlePlayPause(currentAudioIndex);
    // }
    function handlePlayPause(index: number) {
        if (currentRef.current === index) {
            player.playing ? player.pause() : player.play();
            if (player.playing) {
                setCurrentPlayingIndex(index);
                setCurrentPauseIndex(-1);
            }
            else
                setCurrentPauseIndex(index);
            return;
        }
        if (currentRef.current != index) {
            player.replace(currentSourceRef.current);
            player.play();
            setCurrentPlayingIndex(index);
            currentRef.current = index;
            return;
        }
    }
    const router = useRouter();
    useEffect(() => { }, [currentPlayingIndex, currentPauseIndex]);
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1, padding: 20, marginTop: 0 }}>
                {musicFiles.map((music, index) => {
                    return (
                        <TouchableOpacity key={index} style={styles.item} onPress={() => {
                            player.pause();
                            // player.replace();
                            router.push(`../screens/${index}`)
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{music.title}</Text>
                            <Pressable onPress={() => {
                                currentSourceRef.current = music.file;
                                // Update the current music index only if the player is not already playing this music
                                handlePlayPause(index);

                            }}>
                                <Ionicons
                                    name={currentPlayingIndex !== currentPauseIndex
                                        && currentPlayingIndex === index
                                        ? "pause-circle" : "play-circle"}
                                    size={32}
                                    color="black"
                                    style={styles.icon}
                                />
                            </Pressable>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {
                currentPlayingIndex !== -1 && <Pressable style={styles.modal} onPress={() => {
                    handlePlayPause(currentPlayingIndex);
                }}>
                    <Text>{musicFiles[currentPlayingIndex].title}</Text>
                    <Ionicons
                        name={currentPauseIndex === -1 ? "pause-circle" : "play-circle"}
                        size={32}
                        style={styles.icon}
                    />
                </Pressable>
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
    item: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderWidth: 1,
    },
    modal: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: "#f8f8f8",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        transitionDelay: "0.3s",
    },
    icon: {
        color: "white",
        padding: 8,
        borderRadius: 50,
        backgroundColor: "#6b6e49",
    },
});
export default Home;