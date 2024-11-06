'use server'
import { useState } from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface CardData {
  Id: string,
  Question: string,
  Answer: string,
  Understanding: number,
}

export async function getCardsFromDB() {
  const cards = await prisma.cards.findMany()

  return cards
}
