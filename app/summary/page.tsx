'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Card, getCards } from '@/app/components/cards';
import { removeCard } from '@/app/components/cards_server';

function generatePercentageColor(time: number) {
  const gradient = [
    { time: 0.0, color: [235, 93, 89] }, // "hard" color
    { time: 0.5, color: [235, 198, 89] }, // "medium" color
    { time: 1.0, color: [153, 235, 89] }, // "easy" color
  ];

  const rgbToString = (color: number[]) => `rgb(${color.join(',')})`;

  for (let i = 1; i < gradient.length; i++) {
    if (time < gradient[i].time) {
      const start = gradient[i - 1];
      const end = gradient[i];
      const relativeTime = (time - start.time) / (end.time - start.time);

      const interpolatedColor = start.color.map((startChannel, index) =>
        Math.round(startChannel * (1.0 - relativeTime) + end.color[index] * relativeTime)
      );

      return rgbToString(interpolatedColor);
    }
    if (time === gradient[i].time) {
      return rgbToString(gradient[i].color);
    }
  }

  return 'rgb(255,0,255)'; // Fallback color
}

function CardReport({ card, onRemove }: { card: Card; onRemove: () => void }) {
  const percentUnderstood = Math.round(card.understanding * 100);

  return (
    <div className="flex items-center gap-4 p-3 border-b border-gray-300">
      <div
        style={{ backgroundColor: generatePercentageColor(card.understanding) }}
        className="w-20 h-20 flex items-center justify-center text-white font-bold rounded-lg shadow-md"
      >
        {percentUnderstood}%
      </div>
      <div className="flex-grow text-gray-800 text-lg">{card.question}</div>
      <button
        className="flex items-center justify-center p-2 bg-red-500 rounded-full hover:bg-red-600 transition"
        onClick={onRemove}
      >
        <Image src="/x_icon.svg" width={20} height={20} alt="Remove card icon" />
      </button>
    </div>
  );
}

export default function Summary() {
  const cards = getCards();
  const [removedCards, setRemovedCards] = useState<string[]>([]);

  if (cards == null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading cards...</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 text-lg">Add a card and start studying to see your summary!</p>
      </div>
    );
  }

  function removeCardReport(id: string) {
    setRemovedCards((prev) => [...prev, id]);
    removeCard(id);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Summary</h1>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 border-b pb-3 text-gray-600 font-medium">
          <span className="w-20 text-center">Understood</span>
          <span className="flex-grow">Question</span>
          <span>Remove</span>
        </div>
        {cards.map((card: Card) => {
          if (removedCards.includes(card.id)) {
            return null;
          }

          return (
            <CardReport
              key={card.id}
              card={card}
              onRemove={() => removeCardReport(card.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
