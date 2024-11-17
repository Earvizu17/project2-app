"use client";
import { useEffect, useState } from "react";

import { Card, getCards } from "@/app/components/cards";
import { CardRating, rateCard } from "@/app/components/understanding_updater";

export default function Study() {
  const cards: Card[] | null = getCards();
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  function pickCard() {
    if (!cards) return null;

    const duplicateWeight = 0.005;
    const ranges: number[] = [0.0];

    for (let i = 0; i < cards.length; i++) {
      if (currentCard && cards.length > 1 && currentCard.id === cards[i].id) {
        ranges.push(ranges[i] + duplicateWeight);
      } else {
        const cardPriority = 1.0 - cards[i].understanding;
        ranges.push(ranges[i] + cardPriority);
      }
    }

    const selectionNumber = Math.random() * ranges[ranges.length - 1];

    for (let i = 0; i < cards.length; i++) {
      if (selectionNumber < ranges[i + 1]) {
        return cards[i];
      }
    }
  }

  useEffect(() => {
    if (!cards) return;
    const card = pickCard();
    if (card) setCurrentCard(card);
  }, [cards]);

  function InteractableSection({ answer }: { answer: string }) {
    const [answerRevealed, setAnswerRevealed] = useState(false);

    function revealAnswer() {
      setAnswerRevealed(true);
    }

    function rateQuestion(rating: CardRating) {
      rateCard(currentCard as Card, rating);
      setAnswerRevealed(false);

      const card = pickCard();
      if (card) setCurrentCard(card);
    }

    if (answerRevealed) {
      return (
        <div className="mt-8 text-center">
          <h1 className="text-xl font-bold text-blue-700">{answer}</h1>
          <p className="mt-6 text-lg">Rate the question difficulty:</p>
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => rateQuestion(CardRating.EASY)}
              className="px-6 py-3 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Easy
            </button>
            <button
              onClick={() => rateQuestion(CardRating.MEDIUM)}
              className="px-6 py-3 text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition"
            >
              Medium
            </button>
            <button
              onClick={() => rateQuestion(CardRating.HARD)}
              className="px-6 py-3 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Hard
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={revealAnswer}
        className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Reveal Answer
      </button>
    );
  }

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Cards are loading, please wait...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-semibold text-gray-800">{currentCard.question}</h1>
      <InteractableSection answer={currentCard.answer} />
    </div>
  );
}
