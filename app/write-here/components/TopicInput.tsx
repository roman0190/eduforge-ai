// src/components/TopicInput.tsx
import React, { useState, useEffect } from "react";
import { Input, Typography, Button, Tooltip } from "antd";
import {
  AudioOutlined,
  LoadingOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

interface TopicInputProps {
  topicName: string;
  setTopicName: (value: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ topicName, setTopicName }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [isSupported, setIsSupported] = useState(true);
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const [lastSpeechTime, setLastSpeechTime] = useState<number>(0);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      // Use the browser's SpeechRecognition API
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI();

        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "en-US"; // Set language to English

        // Handle results
        recognitionInstance.onresult = (event) => {
          // Type assertion for event.results
          const results = Array.from(Array.prototype.slice.call(event.results));
          const transcript = results
            .map((result) => result[0].transcript)
            .join("");

          // Update the text
          setTopicName(transcript);
          
          // Reset silence detection on new speech
          setLastSpeechTime(Date.now());
          
          // Clear any existing silence timer
          if (silenceTimer) {
            clearTimeout(silenceTimer);
          }
          
          // Set a new silence timer
          const timer = setTimeout(() => {
            // If 2 seconds have passed since last speech, stop recording
            if (Date.now() - lastSpeechTime > 2000) {
              if (recognition) {
                recognition.stop();
                setIsRecording(false);
              }
            }
          }, 2000);
          
          setSilenceTimer(timer);
        };

        // Handle end of speech recognition
        recognitionInstance.onend = () => {
          setIsRecording(false);
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };

        setRecognition(recognitionInstance);
      } else {
        setIsSupported(false);
        console.warn("Speech recognition not supported in this browser");
      }
    } else {
      setIsSupported(false);
      console.warn("Speech recognition not supported in this browser");
    }

    // Cleanup function
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Play sound function
  const playSound = (type: 'start' | 'stop') => {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'start') {
      // Higher pitch sound for starting
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      setTimeout(() => oscillator.stop(), 300);
    } else {
      // Lower pitch sound for stopping
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      setTimeout(() => oscillator.stop(), 300);
    }
  };

  // Toggle recording
  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTopicName(""); // Clear existing text
      
      // Play start sound
      try {
        playSound('start');
      } catch (e) {
        console.error('Could not play sound:', e);
      }
      
      // Start recognition
      recognition.start();
      setIsRecording(true);
      
      // Set initial last speech time
      setLastSpeechTime(Date.now());
    }
  };

  return (
    <div className="w-full space-y-2">
      <Text className="text-gray-700 font-medium text-base">Topic *</Text>

      <div className="relative">
        <TextArea
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          placeholder="Enter your topic here... (e.g., Climate Change, Digital Bangladesh, etc.)"
          autoSize={{ minRows: 3, maxRows: 6 }}
          className={`!text-base ${
            isRecording ? "border-blue-400 shadow-sm shadow-blue-200" : ""
          }`}
          showCount
          maxLength={200}
        />

        {isSupported && (
          <Tooltip title={isRecording ? "Stop recording" : "Voice input"}>
            <Button
              type={isRecording ? "primary" : "default"}
              shape="circle"
              size="small"
              onClick={toggleRecording}
              icon={isRecording ? <StopOutlined /> : <AudioOutlined />}
              danger={isRecording}
              className={`absolute bottom-2 right-2 z-10 ${
                isRecording ? "animate-pulse" : ""
              }`}
            />
          </Tooltip>
        )}
      </div>

      {isRecording && (
        <Text className="text-blue-600 text-sm flex items-center">
          <LoadingOutlined className="mr-1" /> Listening... speak clearly
        </Text>
      )}

      {topicName.length > 0 && !isRecording && (
        <Text className="text-green-600 text-sm">
          ✓ Topic entered successfully
        </Text>
      )}
    </div>
  );
};

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: { error: string }) => void;
  }

  interface SpeechRecognitionEvent {
    results: {
      [index: number]: {
        [index: number]: {
          transcript: string;
        };
      };
    };
  }
}

export default TopicInput;
