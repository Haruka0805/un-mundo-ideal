/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generates audio from text using Gemini TTS.
 * @param text The text to speak.
 * @param language The language code ('ja' or 'en').
 * @returns Base64 encoded audio data.
 */
export async function generateSpeech(text: string, language: 'ja' | 'en') {
  const prompt = language === 'ja' 
    ? `以下の文章を自然な日本語の話し言葉で読み上げてください：${text}`
    : `Please read the following text in a natural, friendly tone: ${text}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-tts-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          // 'Kore' is a good general-purpose voice
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return base64Audio;
}

/**
 * Plays audio from a base64 string.
 */
export async function playBase64Audio(base64Data: string) {
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  // Create a blob from the binary data
  // Note: Gemini TTS returns raw PCM or similar encoded format usually wrapped or as raw chunks.
  // The skill mentions sample rate 24000. 
  // For simplicity in a browser, we can convert to a Blob if the mimeType is present,
  // but usually for raw PCM we'd use AudioContext.
  // Let's assume the standard way mentioned in skill for "encoded audio" if we can wrap it.
  
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const arrayBuffer = bytes.buffer;
  
  try {
    // Decoding raw PCM might need more specific handling, 
    // but often browser decodeAudioData works for many formats.
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    
    return new Promise<void>((resolve) => {
      source.onended = () => resolve();
    });
  } catch (e) {
    console.error("Error playing audio:", e);
    // Fallback: If it's a WAV or something already encoded
    const blob = new Blob([bytes], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await audio.play();
    return new Promise<void>((resolve) => {
      audio.onended = () => resolve();
    });
  }
}
