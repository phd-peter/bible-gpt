"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import FAQAccordion, { FAQItem } from "./components/FAQAccordion";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "안녕하세요! 성경에 대해 궁금한 점을 자유롭게 질문해 주세요." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const faqList: FAQItem[] = [
    {
      question: "요한복음 3장 16절을 알려줘",
      answer: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니... (요 3:16)",
    },
    {
      question: "창세기 내용을 요약해줘",
      answer: "창세기는 세상의 창조와 인류의 시작, 아브라함의 이야기 등을 담고 있습니다.",
    },
    {
      question: "위로가 되는 성경 구절이 뭐가 있을까?",
      answer: "마태복음 11:28, 시편 23편 등 다양한 구절이 있습니다.",
    },
    {
      question: "다윗은 누구야?",
      answer: "다윗은 이스라엘의 두 번째 왕으로, 시편의 저자이기도 합니다.",
    },
    {
      question: "아침에 드릴 수 있는 기도문을 알려줘",
      answer: "하나님, 오늘 하루도 인도해 주세요...",
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) {
        throw new Error("API Error");
      }
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message || "답변을 불러오지 못했습니다." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) handleSend();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex flex-col items-center py-8 gap-2">
        <Image src="/next.svg" alt="말씀 길잡이 로고" width={120} height={30} className="dark:invert" />
        <h1 className="text-2xl font-bold tracking-tight">말씀 길잡이</h1>
        <p className="text-sm text-gray-500">성경 Q&A ChatGPT</p>
      </header>
      <main className="flex-1 flex flex-col items-center px-2 sm:px-0 w-full">
        <div className="w-full flex flex-col sm:flex-row items-stretch gap-4 mb-4 max-w-5xl mx-auto">
          <div className="sm:w-1/3 w-full flex-shrink-0">
            <FAQAccordion faqs={faqList} />
          </div>
          <div className="sm:w-2/3 w-full flex flex-col">
            <div className="w-full flex-1 chat-scroll bg-white dark:bg-black/30 rounded-lg shadow p-4 flex flex-col gap-2 mb-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 max-w-[80%] text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                    aria-label={msg.role === "user" ? "내 메시지" : "AI 답변"}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm animate-pulse">
                    답변을 불러오는 중...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="w-full flex gap-2 mt-auto">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-black/40"
                placeholder="성경에 대해 궁금한 점을 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="질문 입력"
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                aria-label="질문 보내기"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-xs text-gray-400">© 2024 말씀 길잡이 | bible-gpt</footer>
    </div>
  );
}
