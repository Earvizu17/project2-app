'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Card, getCards } from '@/app/components/cards'
import { removeCard } from '@/app/components/cards_server'


function generatePercentageColor(time: number) {
  // RGB Values
  const gradient = [
    {
      time: 0.0,
      color: [235, 93, 89], //"hard" color
    },
    {
      time: 0.5,
      color: [235, 198, 89], //"medium" color
    },
    {
      time: 1.0,
      color: [153, 235, 89], //"easy" color
    },
  ]

  function rgbToString(color: number[]) {
    return "rgb(" + color.join(",") + ")"
  }

  for (let keyIndex = 1; keyIndex < gradient.length; keyIndex++) {
    if (time < gradient[keyIndex].time) {
      const startKey = gradient[keyIndex - 1]
      const endKey = gradient[keyIndex]
      const relativeTime = (time - startKey.time) / (endKey.time - startKey.time)

      let newColor: number[] = []
      for (let channelIndex = 0; channelIndex < startKey.color.length; channelIndex++) {
        newColor.push(Math.round(
          startKey.color[channelIndex] * (1.0 - relativeTime)
          + endKey.color[channelIndex] * relativeTime
        ))
      }

      return rgbToString(newColor)
    }
    else if (time == gradient[keyIndex].time) {
      return rgbToString(gradient[keyIndex].color)
    }
  }

  return "rgb(255,0,255)"


}


function CardReport({ card, onRemove }: {card: Card, onRemove: () => void}) {
  const percentUnderstood = Math.round(card.understanding * 100)

  return (
    <div className="flex mx-2 py-2 items-center border-t border-b border-gray-700">
      <div
        style={{ backgroundColor: generatePercentageColor(card.understanding)}}
        className="p-1 rounded-lg mr-2 w-24 text-center text-itext font-bold"
      >
        {percentUnderstood}%
      </div>
      <div className="flex-grow">
        {card.question}
      </div>
      <button className="bg-hard p-1 rounded-lg" onClick={onRemove}>
        <Image src="/x_icon.svg" width={20} height={20} alt="Remove card icon"/>
      </button>
    </div>
  )
}

export default function Summary() {
  const cards = getCards()

  const [removedCards, setRemovedCards] = useState<string[]>([])


  if (cards == null) {
    return <div>Loading cards...</div>
  }

  // Runs if the user hasn't added any cards.
  if (cards.length == 0) {
    return <div>Add a card and start studying to see your summary!</div>
  }

  function removeCardReport(id: string) {
    setRemovedCards([...removedCards, id])
    removeCard(id)
  }

  return (
    <div>
      <h1>Summary</h1>
      <div className="standard-panel">
      <div className="flex mx-2">
	<span className="w-24 text-center">Understood</span>
	<span className="flex-grow mx-2">Question</span>
	<span>Remove Card</span>
      </div>
        {
          cards.map((card: Card) => {
            if (removedCards.indexOf(card.id) != -1) {
              return
            }
            
            return <CardReport card={card} key={card.id} onRemove={() => removeCardReport(card.id)}/>
          })
        }
      </div>
    </div>
  )
}
