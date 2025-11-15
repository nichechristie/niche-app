"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function JesusChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome! I'm here to help you learn about Jesus Christ - His life, teachings, miracles, death, and resurrection. Ask me anything about the Savior of the world!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/jesus/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }]
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again."
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Why did Jesus have to die?",
    "What is the Gospel?",
    "Tell me about Jesus' miracles",
    "Explain the Sermon on the Mount",
    "What are Jesus' parables about?",
  ];

  return (
    <div className="glass rounded-xl flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">✝️</span>
          Jesus Study Assistant
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Learn about the life and teachings of Jesus Christ
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "glass border border-slate-700 text-gray-200"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass border border-slate-700 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(question);
                  setTimeout(() => sendMessage(), 100);
                }}
                className="text-xs px-3 py-1.5 glass border border-slate-700 rounded-lg hover:bg-indigo-500/20 hover:border-indigo-500 transition-all text-gray-300"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Jesus..."
            className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
