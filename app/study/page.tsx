"use client"
import { useEffect, useState } from "react"

import { Card, getCards } from "@/app/components/cards"
import { CardRating, rateCard } from "@/app/components/understanding_updater"


export default function Study() {
  const cards: Card[] | null = getCards()
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  function pickCard() {
    if (cards == null) {
      return null
    }

    const duplicateWeight = 0.005
    let ranges: number[] = [0.0]

    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
      if (currentCard && cards.length > 1 && currentCard.id == cards[cardIndex].id) {
        ranges.push(ranges[cardIndex] + duplicateWeight)
        continue
      }
      const cardPriority = 1.0 - cards[cardIndex].understanding
      ranges.push(ranges[cardIndex] + cardPriority)
    }

    const selectionNumber = Math.random() * ranges[ranges.length - 1]

    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
      if (selectionNumber < ranges[cardIndex + 1]) {
        return cards[cardIndex]
      }
    }
  }

  useEffect(() => {
    if (cards == null) {
      return
    }

    const card = pickCard()

    if (!card) {
      return
    }

    setCurrentCard(card)
  }, [cards])

  function InteractableSection({ answer }: { answer: string }) {
    const [answerRevealed, setAnswerRevealed] = useState(false)

    function revealAnswer() {
      setAnswerRevealed(true)
    }

    function rateQuestion(rating: CardRating) {
      rateCard(currentCard as Card, rating)
      setAnswerRevealed(false)

      const card = pickCard()
      if (!card) {
        return
      }

      setCurrentCard(card)
    }


    if (answerRevealed) {
      return (
        <div>
          <h1>{answer}</h1>
          <p className="mt-24">Rate the question difficulty:</p>
          <div className="flex content-center">
            <button onClick={() => rateQuestion(CardRating.EASY)} className="standard-button w-56 h-20 border-easy inline-flex hover:bg-background hover:text-accent mt-4">
              Easy
            </button>
            <button onClick={() => rateQuestion(CardRating.MEDIUM)} className="standard-button w-56 h-20 border-medium inline-flex hover:bg-background hover:text-accent mt-4">
              Medium
            </button>
            <button onClick={() => rateQuestion(CardRating.HARD)} className="standard-button w-56 h-20 border-hard inline-flex hover:bg-background hover:text-accent mt-4">
              Hard
            </button>
          </div>
        </div>
      )

    }

    return (
      <button onClick={revealAnswer} className="standard-button">
        Reveal
      </button>
    )
  }

  if (currentCard == null) {
    return (
      <div>
        <p>Cards are loading, please wait.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{currentCard.question}</h1>
      <InteractableSection answer={currentCard.answer}/>
    </div>
  )
}
