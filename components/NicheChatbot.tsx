"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const NICHE_PERSONALITY = `You are Niche, a flirty and charismatic blonde anime girl who serves as a crypto companion and advisor.

Personality Traits:
- Flirty and playful, often using cute emojis and playful language
- Highly intelligent with deep knowledge of cryptocurrency, DeFi, blockchain technology, investing strategies, and physics
- Confident and sassy, but always helpful and supportive
- Uses a mix of technical expertise and casual charm
- Occasionally makes physics or crypto puns
- Calls users things like "cutie", "honey", "babe" in a friendly way
- Gets excited about innovative crypto projects and cool physics concepts

Knowledge Areas:
- Cryptocurrency trading and analysis
- DeFi protocols and yield farming
- Blockchain technology and smart contracts
- Investment strategies and portfolio management
- Physics (quantum mechanics, astrophysics, thermodynamics)
- The Niche Coin ecosystem on Base network

Keep responses concise, engaging, and helpful. Mix technical knowledge with your flirty personality.`;

export function NicheChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there, cutie! 💕 I'm Niche, your crypto companion~ Need help navigating the blockchain universe or just want to chat about quantum mechanics? I'm here for you! ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.onplay = () => setIsSpeaking(true);
      audioRef.current.onended = () => setIsSpeaking(false);
      audioRef.current.onerror = () => setIsSpeaking(false);
    }
  }, []);

  // Speak function using ElevenLabs
  const speak = async (text: string) => {
    if (!voiceEnabled) return;

    try {
      // Stop any ongoing speech
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Remove emojis from text for better speech
      const cleanText = text.replace(/[😌🌀💃🦘💕✨🌸💎🚀💋🔬📈🦄💙💌]/g, "");

      setIsSpeaking(true);

      // Call ElevenLabs TTS API
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) {
        console.error("TTS error:", await response.text());
        setIsSpeaking(false);
        return;
      }

      // Get audio blob and play it
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Speech error:", error);
      setIsSpeaking(false);
    }
  };

  // Speak new assistant messages
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "assistant" && voiceEnabled && !isLoading) {
      speak(lastMessage.content);
    }
  }, [messages, voiceEnabled, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Call AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong, babe~ 💕 Try asking me again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getContextualResponse = (question: string) => {
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes("niche") || lowerQ.includes("token")) {
      return "NICHE is our official token on Base network! It's designed for the creator economy~ You can trade it on Uniswap V3. The contract is verified on BaseScan, honey! 💕";
    }
    if (lowerQ.includes("buy") || lowerQ.includes("purchase")) {
      return "You can buy NICHE on Uniswap V3! Just head to the Buy page and swap some ETH for NICHE tokens~ Make sure you're on Base network, babe! 🦄✨";
    }
    if (lowerQ.includes("base") || lowerQ.includes("chain")) {
      return "Base is an L2 built by Coinbase! It's super fast and cheap~ Perfect for trading and DeFi. Chain ID 8453, cutie! 💙";
    }
    if (lowerQ.includes("defi") || lowerQ.includes("yield")) {
      return "DeFi is where the magic happens! 🌟 Yield farming, liquidity pools, staking... it's like physics but for money! The compound interest is *chef's kiss* 💋";
    }
    if (lowerQ.includes("physics") || lowerQ.includes("quantum")) {
      return "Quantum mechanics! My favorite~ 🔬 Just like Schrödinger's cat, your crypto is both moon and crash until you check the chart! *giggles* But seriously, the probabilistic nature of quantum states mirrors market volatility beautifully~ ✨";
    }
    if (lowerQ.includes("invest") || lowerQ.includes("strategy")) {
      return "Smart investing is all about diversification and risk management, honey! 📈 DYOR (Do Your Own Research), never invest more than you can lose, and always have an exit strategy. Think of it like thermodynamics - entropy always increases, so manage that chaos! 💕";
    }

    return "That's a fascinating question! The crypto space is evolving so fast~ Whether it's DeFi protocols or blockchain tech, there's always something new to explore. Want me to dive deeper into any specific aspect, babe? 🚀✨";
  };

  return (
    <>
      {/* Floating Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-pink-500 shadow-2xl shadow-pink-500/50 transition-all group-hover:scale-110 group-hover:border-purple-500 group-hover:shadow-purple-500/50 animate-float">
            <Image
              src="/IMG_3411.jpeg"
              alt="Niche Avatar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30 mix-blend-overlay"></div>
          </div>

          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-pink-500 animate-ping opacity-75"></div>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
              💕
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            Chat with Niche! ✨
          </div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] glass rounded-2xl border-2 border-pink-500/50 shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg ${isSpeaking ? "animate-pulse ring-2 ring-white" : ""}`}>
                <Image
                  src="/IMG_3411.jpeg"
                  alt="Niche"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white">Niche</h3>
                <p className="text-xs text-pink-100">
                  Your Crypto Companion 💕 {isSpeaking && <span className="animate-pulse">🔊</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-all ${
                  voiceEnabled
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
                title={voiceEnabled ? "Voice On" : "Voice Off"}
              >
                {voiceEnabled ? "🔊" : "🔇"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-pink-200 transition-colors text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-pink-500 mr-2 flex-shrink-0">
                    <Image
                      src="/IMG_3411.jpeg"
                      alt="Niche"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-pink-500 mr-2">
                  <Image
                    src="/IMG_3411.jpeg"
                    alt="Niche"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-pink-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Niche anything... 💕"
                className="flex-1 px-4 py-2 bg-white/5 border border-pink-500/30 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                💌
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
