'use client'
import { Card } from "@/app/components/cards"
import { updateCardUnderstanding } from "@/app/components/cards_server"


export enum CardRating {
  EASY,
  MEDIUM,
  HARD,
}


// 0.999 is used as the value for an EASY rating to prevent the understanding
// value from reaching 1.0, which, by the card selection algorithm, would make
// it have a probability of 0.0 to be selected.
const ratingValues = {
  [CardRating.EASY]: 0.999,
  [CardRating.MEDIUM]: 0.5,
  [CardRating.HARD]: 0.0,
}


const newRatingWeight = 0.2

// Caching the understanding value of each card means that we don't have to
// fetch the value again from the server after we update it. (The "cards"
// state in cards.tsx is only fetched when the page is loaded, so its
// understanding values quickly become outdated.)
let understandingCache: {[id: string]: number} = {}


export function rateCard(card: Card, rating: CardRating) {
  const understanding = (card.id in understandingCache) ? understandingCache[card.id] : card.understanding
  const newUnderstanding = understanding * (1.0 - newRatingWeight) + ratingValues[rating] * newRatingWeight
  updateCardUnderstanding(card.id, newUnderstanding)
  understandingCache[card.id] = newUnderstanding
}