"use client";

import LoveGlow from "@/components/LoveGlow";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const texts = ["Haloooo sayangggg", "Cobaaa klik tombol dibawah inii"];
const TYPING_SPEED = 100;
const ERASE_SPEED = 50;
const PAUSE_DURATION = 1000;

export default function Home() {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting && displayText.length < currentText.length) {
      setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, TYPING_SPEED);
    } else if (isDeleting && displayText.length > 0) {
      setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, ERASE_SPEED);
    } else if (!isDeleting && displayText.length === currentText.length) {
      setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [displayText, isDeleting, textIndex]);

  return (
    <main className="relative flex flex-col h-screen items-center justify-center bg-gradient-to-b from-pink-100 to-red-200 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-3xl font-bold text-pink-500 text-center min-w-[250px]">
        {displayText}
        <span className="animate-blink">|</span>
      </h1>
      <LoveGlow />
      <Button
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg transition mt-5"
        onClick={() => router.push("/puzzle")}
      >
        Mainkan Puzzle 💖
      </Button>
    </main>
  );
}
