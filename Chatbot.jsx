// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleGenAI, Chat } from '@google/genai';
// import { SendIcon, RobotIcon } from './icons';

const Chatbot = () => {
  // const [chat, setChat] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  //   const newChat = ai.chats.create({
  //     model: 'gemini-2.5-flash',
  //   });
  //   setChat(newChat);
  //   setMessages([{ sender: 'bot', text: "Hello! How can I help you today?" }]);
  // }, []);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(scrollToBottom, [messages]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!input.trim() || !chat || isLoading) return;

  //   const userMessage= { sender: 'user', text: input };
  //   setMessages(prev => [...prev, userMessage]);
  //   setInput('');
  //   setIsLoading(true);
    
  //   setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

  //   try {
  //     const result = await chat.sendMessageStream({ message: input });
  //     for await (const chunk of result) {
  //       const chunkText = chunk.text;
  //       setMessages(prev => {
  //         const lastMessage = prev[prev.length - 1];
  //         if (lastMessage.sender === 'bot') {
  //           return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunkText }];
  //         }
  //         return prev;
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Gemini API error:', error);
  //     setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: "Sorry, I encountered an error. Please try again." }]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // return (
  //   <div className="h-full flex flex-col p-4 bg-slate-800">
  //     <div className="flex-grow overflow-y-auto space-y-4 pr-2">
  //       {messages.map((msg, index) => (
  //         <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
  //           {msg.sender === 'bot' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center"><RobotIcon /></div>}
  //           <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-sky-700 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
  //             <p className="whitespace-pre-wrap">{msg.text || '...'}</p>
  //           </div>
  //         </div>
  //       ))}
  //       <div ref={messagesEndRef} />
  //     </div>
  //     <form onSubmit={handleSubmit} className="mt-4 flex-shrink-0 flex items-center gap-2">
  //       <input
  //         type="text"
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //         placeholder="Ask something..."
  //         className="flex-grow bg-slate-700 border border-slate-600 rounded-lg shadow-sm py-2 px-4 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
  //         disabled={isLoading}
  //       />
  //       <button
  //         type="submit"
  //         className="p-3 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
  //         disabled={isLoading || !input.trim()}
  //         aria-label="Send message"
  //       >
  //         <SendIcon />
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default Chatbot;
