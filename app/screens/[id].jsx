import musicFiles from "@/assets/audioLists";
import { usePlayerStore } from "@/utils/PlayerStore";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Player() {
    const { id } = useLocalSearchParams();
    const startIndex = Number(id) || 0;

    const currentAudioIndex = usePlayerStore((state) => state.currentAudioIndex);
    const setCurrentAudioIndex = usePlayerStore((state) => state.setCurrentAudioIndex);
    const isPlaying = usePlayerStore((state) => state.isPlaying);
    const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

    // const [setCurrentAudioIndex, setsetCurrentAudioIndex] = useState(startIndex);
    const player = useAudioPlayer();

    // Sync Zustand on mount
    useEffect(() => {
        setIsPlaying(true);
        setCurrentAudioIndex(startIndex);
        player.replace(musicFiles[startIndex].file);
        console.log(currentAudioIndex);
        player.play();
    }, [startIndex]);

    const handlePlayPause = () => {
        console.log("handlePlayPause", isPlaying);
        if (isPlaying) {
            player.pause();
            setIsPlaying(false);
        } else {
            player.play();
            setIsPlaying(true);
        }
    };

   async function handleNextAudio() {
        const nextIndex = (currentAudioIndex + 1) % musicFiles.length;
        setCurrentAudioIndex(nextIndex);
        player.replace(musicFiles[nextIndex].file);
        setIsPlaying(true);
        player.play();
        // console.log("Next audio playing:", musicFiles[nextIndex].title);
    };


    const handlePrevAudio = () => {
        const prevIndex = (currentAudioIndex - 1 + musicFiles.length) % musicFiles.length;
        setIsPlaying(true);
        setCurrentAudioIndex(prevIndex);
        player.replace(musicFiles[prevIndex].file);
        player.play();
        // console.log("Previous audio playing:", musicFiles[prevIndex].title);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{musicFiles[currentAudioIndex].title}</Text>
            <Image style={styles.img} source={musicFiles[currentAudioIndex].cover}></Image>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={handlePrevAudio}>
                    <Ionicons name="play-back" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNextAudio}>
                    <Ionicons name="play-forward" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        height: "100%",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        // marginBottom: 10,
        textAlign: "center",
        color: "#333",
    },
    img: {
        width: "100%",
        height: 300,
        marginTop: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#f0f0f0",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});