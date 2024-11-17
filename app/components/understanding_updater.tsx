'use client'
import { Card } from "@/app/components/cards"
import { updateCardUnderstanding } from "@/app/components/cards_server"


export enum CardRating {
  EASY,
  MEDIUM,
  HARD,
}



const ratingValues = {
  [CardRating.EASY]: 0.999,
  [CardRating.MEDIUM]: 0.5,
  [CardRating.HARD]: 0.0,
}


const newRatingWeight = 0.2


let understandingCache: {[id: string]: number} = {}


export function rateCard(card: Card, rating: CardRating) {
  const understanding = (card.id in understandingCache) ? understandingCache[card.id] : card.understanding
  const newUnderstanding = understanding * (1.0 - newRatingWeight) + ratingValues[rating] * newRatingWeight
  updateCardUnderstanding(card.id, newUnderstanding)
  understandingCache[card.id] = newUnderstanding
}