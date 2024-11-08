'use server'
import { useState } from 'react'
import { db } from '@vercel/postgres'

const client = await db.connect();

export interface CardData {
  Id: string,
  Question: string,
  Answer: string,
  Understanding: number,
}

export async function getCardsFromDB() {
  const cards = await client.cards.findMany()

  return cards
}
