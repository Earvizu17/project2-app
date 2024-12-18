'use server'
import { redirect } from 'next/navigation'
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

export async function addCard(formState: string, form: FormData) {
  const response = await prisma.cards.create({
    data: {
      Question: form.get("question") as string,
      Answer: form.get("answer") as string,
      Understanding: parseInt(form.get("understanding") as string, 10) || 0,
    },
    select: {
      Id: true,
    },
  })

  return response.Id
}

export async function removeCard(id: string) {
  await prisma.cards.delete({
    where: {
      Id: id,
    },
  })
}

export async function updateCardUnderstanding(id: string, understanding: number) {
  await prisma.cards.update({
    where: {
      Id: id,
    },
    data: {
      Understanding: understanding,
    },
  })
}