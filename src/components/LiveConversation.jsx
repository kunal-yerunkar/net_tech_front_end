// import React, { useState, useRef, useEffect, useCallback } from 'react';
// // Fix: LiveSession is not an exported member of @google/genai, so it has been removed from the import.
// import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
// import { MicrophoneIcon, StopIcon } from './icons';

// function encode(bytes) {
//   let binary = '';
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return btoa(binary);
// }

// function decode(base64) {
//     const binaryString = atob(base64);
//     const len = binaryString.length;
//     const bytes = new Uint8Array(len);
//     for (let i = 0; i < len; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
//     return bytes;
// }
  
// async function decodeAudioData(data, ctx, sampleRate, numChannels) {
//     const dataInt16 = new Int16Array(data.buffer);
//     const frameCount = dataInt16.length / numChannels;
//     const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  
//     for (let channel = 0; channel < numChannels; channel++) {
//       const channelData = buffer.getChannelData(channel);
//       for (let i = 0; i < frameCount; i++) {
//         channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
//       }
//     }
//     return buffer;
// }

const LiveConversation = () => {
    // const [status, setStatus] = useState<SessionStatus>('idle');
    // const [transcript, setTranscript] = useState([]);
    
    // // Fix: Infer the session promise type from the `connect` method since `LiveSession` is not exported.
    // const sessionPromiseRef = useRef(null);
    // const inputAudioContextRef = useRef(null);
    // const outputAudioContextRef = useRef(null);
    // const mediaStreamRef = useRef(null);
    // const scriptProcessorRef = useRef(null);
    // const mediaStreamSourceRef = useRef(null);

    // const nextStartTimeRef = useRef(0);
    // const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    // const cleanup = useCallback(() => {
    //     scriptProcessorRef.current?.disconnect();
    //     mediaStreamSourceRef.current?.disconnect();
    //     mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    //     inputAudioContextRef.current?.close();
    //     outputAudioContextRef.current?.close();
        
    //     sessionPromiseRef.current?.then(session => session.close()).catch(console.error);

    //     scriptProcessorRef.current = null;
    //     mediaStreamSourceRef.current = null;
    //     mediaStreamRef.current = null;
    //     inputAudioContextRef.current = null;
    //     outputAudioContextRef.current = null;
    //     sessionPromiseRef.current = null;
    //     sourcesRef.current.clear();
    //     nextStartTimeRef.current = 0;
    // }, []);

    // const handleStart = async () => {
    //     if (status === 'active' || status === 'connecting') return;
    //     cleanup();
    //     setTranscript([]);
    //     setStatus('connecting');

    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //         mediaStreamRef.current = stream;

    //         inputAudioContextRef.current = new (window.AudioContext || (window).webkitAudioContext)({ sampleRate: 16000 });
    //         outputAudioContextRef.current = new (window.AudioContext || (windowy).webkitAudioContext)({ sampleRate: 24000 });

    //         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY  });

    //         sessionPromiseRef.current = ai.live.connect({
    //             model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    //             callbacks: {
    //                 onopen: () => {
    //                     setStatus('active');
    //                     const source = inputAudioContextRef.current?.createMediaStreamSource(stream);
    //                     mediaStreamSourceRef.current = source;
    //                     const scriptProcessor = inputAudioContextRef.current?.createScriptProcessor(4096, 1, 1);
    //                     scriptProcessorRef.current = scriptProcessor;

    //                     scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
    //                         const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
    //                         const l = inputData.length;
    //                         const int16 = new Int16Array(l);
    //                         for (let i = 0; i < l; i++) {
    //                             int16[i] = inputData[i] * 32768;
    //                         }
    //                         const pcmBlob = {
    //                             data: encode(new Uint8Array(int16.buffer)),
    //                             mimeType: 'audio/pcm;rate=16000',
    //                         };
    //                         sessionPromiseRef.current?.then((session) => {
    //                             session.sendRealtimeInput({ media: pcmBlob });
    //                         });
    //                     };
    //                     source.connect(scriptProcessor);
    //                     scriptProcessor.connect(inputAudioContextRef.current?.destination);
    //                 },
    //                 onmessage: async (message) => {
    //                     const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
    //                     if (base64Audio && outputAudioContextRef.current) {
    //                         const outCtx = outputAudioContextRef.current;
    //                         nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
    //                         const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
    //                         const sourceNode = outCtx.createBufferSource();
    //                         sourceNode.buffer = audioBuffer;
    //                         sourceNode.connect(outCtx.destination);
    //                         sourceNode.addEventListener('ended', () => {
    //                             sourcesRef.current.delete(sourceNode);
    //                         });
    //                         sourceNode.start(nextStartTimeRef.current);
    //                         nextStartTimeRef.current += audioBuffer.duration;
    //                         sourcesRef.current.add(sourceNode);
    //                     }

    //                     if(message.serverContent?.outputTranscription) {
    //                         setTranscript(prev => [...prev, `Gemini: ${message.serverContent?.outputTranscription.text}`]);
    //                     }
    //                     if(message.serverContent?.inputTranscription) {
    //                         setTranscript(prev => [...prev, `You: ${message.serverContent?.inputTranscription.text}`]);
    //                     }
    //                 },
    //                 onerror: (e) => {
    //                     console.error('Live API Error:', e);
    //                     setStatus('error');
    //                     setTranscript(prev => [...prev, "Error: Connection failed."]);
    //                     cleanup();
    //                 },
    //                 onclose: (e) => {
    //                     setStatus('stopped');
    //                     cleanup();
    //                 },
    //             },
    //             config: {
    //                 responseModalities: [Modality.AUDIO],
    //                 outputAudioTranscription: {},
    //                 inputAudioTranscription: {},
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Failed to start session:', error);
    //         setStatus('error');
    //         setTranscript(["Error: Could not get microphone permissions."]);
    //     }
    // };

    // const handleStop = () => {
    //     setStatus('stopped');
    //     cleanup();
    // };

    // useEffect(() => {
    //     return () => cleanup();
    // }, [cleanup]);

    // const getStatusText = () => {
    //     switch(status) {
    //         case 'idle': return 'Ready to start';
    //         case 'connecting': return 'Connecting...';
    //         case 'active': return 'Listening...';
    //         case 'error': return 'An error occurred';
    //         case 'stopped': return 'Session ended';
    //     }
    // }

    // return (
    //     <div className="p-6 h-full flex flex-col items-center justify-between">
    //         <div className="w-full text-center">
    //             <h3 className="text-xl font-semibold text-slate-100">Live Conversation</h3>
    //             <p className="text-slate-400 text-sm mt-1">Talk with Gemini in real-time.</p>
    //             <div className="mt-4 text-sm font-mono p-3 bg-slate-900 rounded-lg h-12 flex items-center justify-center">
    //                 <span className="animate-pulse">{getStatusText()}</span>
    //             </div>
    //         </div>

    //         <div className="w-full h-64 bg-slate-900 rounded-lg p-3 overflow-y-auto border border-slate-700 my-4">
    //             {transcript.map((line, i) => <p key={i} className="text-sm text-slate-300">{line}</p>)}
    //         </div>
            
    //         <div className="flex-shrink-0">
    //             {status !== 'active' && status !== 'connecting' ? (
    //                 <button onClick={handleStart} className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 ring-green-500 ring-offset-4 ring-offset-slate-800">
    //                     <MicrophoneIcon />
    //                 </button>
    //             ) : (
    //                 <button onClick={handleStop} className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 ring-red-500 ring-offset-4 ring-offset-slate-800">
    //                     <StopIcon />
    //                 </button>
    //             )}
    //         </div>
    //     </div>
    // );
};

export default LiveConversation;