/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const GRID_SIZE = 3;
const IMAGE_SRC = "/berdua.jpg";

export default function PuzzlePage() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [showSecret, setShowSecret] = useState<boolean>(false);

  useEffect(() => {
    const initialTiles = Array.from(
      { length: GRID_SIZE * GRID_SIZE },
      (_, i) => i
    );
    shuffleTiles(initialTiles);
  }, []);

  const shuffleTiles = (initialTiles: number[]) => {
    const shuffledTiles = [...initialTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
    setIsSolved(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tiles.indexOf(active.id);
    const newIndex = tiles.indexOf(over.id);
    const newTiles = arrayMove(tiles, oldIndex, newIndex);
    setTiles(newTiles);

    if (
      JSON.stringify(newTiles) ===
      JSON.stringify(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i))
    ) {
      setIsSolved(true);
    }
  };

  const solvePuzzle = () => {
    setTiles(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i));
    setIsSolved(true);
  };

  const handleSecretClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 >= 5) {
      setShowSecret(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-red-200 dark:from-gray-800 dark:to-gray-900 p-4">
      <h1
        className="text-pink-600 text-3xl md:text-4xl font-extrabold mb-6 cursor-pointer select-none"
        onClick={handleSecretClick}
      >
        💖 Tebak Puzzle 💖
      </h1>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tiles}>
          <div className="z-10 grid grid-cols-3 gap-1 bg-white p-2 rounded-xl shadow-2xl border-4 border-pink-300 dark:border-pink-700 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]">
            {tiles.map((tile) => (
              <PuzzleTile key={tile} id={tile} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6 flex gap-4">
        <Button
          className="z-10 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-lg transition text-lg"
          onClick={() => shuffleTiles(tiles)}
        >
          Acak Puzzle 🔀
        </Button>

        {showSecret && (
          <Button
            className="z-10 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition text-lg"
            onClick={solvePuzzle}
          >
            Solve Puzzle ✨
          </Button>
        )}
      </div>

      {isSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-8 p-6 text-center rounded-2xl shadow-2xl border-4 border-pink-400 bg-white w-full max-w-[80vw]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 animate-pulse">
            💖 Happy Valentine's Day, Adeeee! 💖
          </h2>
          <p className="text-lg md:text-xl mt-2 italic font-light text-gray-700">
            "Adeeee, kamu tau gak? Aku tuh kaya puzzle yang ilang satu bagian,
            dan ternyata bagian yang hilang itu kamu! 🧩💕 Sekarang pas udah
            ketemu, aku jadi lengkap. Love uuu, jangan jauh-jauh yaa, ntar aku
            error 😭💗"
          </p>
          <div className="mt-4 flex justify-center space-x-2 text-pink-500">
            <span className="animate-bounce">❤️</span>
            <span className="animate-bounce delay-150">💖</span>
            <span className="animate-bounce delay-300">💕</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function PuzzleTile({ id }: { id: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundImage: `url(${IMAGE_SRC})`,
    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
    backgroundPosition: `${(id % GRID_SIZE) * (100 / GRID_SIZE)}% ${
      Math.floor(id / GRID_SIZE) * (100 / GRID_SIZE)
    }%`,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="relative w-full aspect-square flex items-center justify-center cursor-pointer bg-pink-200"
      style={style}
    ></div>
  );
}
