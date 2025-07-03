import { AudioSource, useAudioPlayer } from "expo-audio";
import { useState } from "react";

export default function usePlayer(audioFile: AudioSource) {
    const player = useAudioPlayer(audioFile);
    const [isPlaying, setIsPlaying] = useState(false);
    const playAudio = async () => {
        try {
            await player.play();
            setIsPlaying(true);
        } catch (error) {
            console.error("Error playing audio:", error);
            
        }
    };

    const pauseAudio = async () => {
        try {
            await player.pause();
            setIsPlaying(false);
        } catch (error) {
            console.error("Error pausing audio:", error);
            
        }
    };
    return {
        playAudio,
        pauseAudio,
        isPlaying,
        player,
    };
}

