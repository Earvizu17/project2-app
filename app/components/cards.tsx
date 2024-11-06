'use client'
import { useState, useEffect } from 'react'

import { CardData, getCardsFromDB } from '@/app/components/cards_server'

export interface Card {
  question: string
  answer: string
  understanding: number
}


/*
export function getCards() {
  const [cards, setCards] = useState<Card[]|null>(null)

  useEffect(() => {
    async function fetchCards() {
      let cardsResponse = await fetch('/cards.json')
      let cards: Card[] = await cardsResponse.json()
      setCards(cards)
    }
    fetchCards()
  }, [])

  return cards
}*/

export function getCards() {
  const [cards, setCards] = useState<Card[]|null>(null)

  useEffect(() => {
    async function fetchCards() {
      const cardsData = await getCardsFromDB()

      const cards = cardsData.map((cardData: CardData) => (
        {
          question: cardData.Question,
          answer: cardData.Answer,
          understanding: cardData.Understanding,
        }
      ))
      setCards(cards)
    }
    fetchCards()
  }, [])

  return cards
}
