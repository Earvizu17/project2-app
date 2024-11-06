'use client'
import { useState, useEffect } from 'react';

import { Card, getCards } from '@/app/components/cards'


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


function CardReport({ card }: {card: Card}) {
  const percentUnderstood = Math.round(card.understanding * 100)
  //const bgClass = "bg-[" + generatePercentageColor(card.understanding) + "]"

  //console.log(bgClass)

  return (
    <div className="flex m-2 items-center">
      <div
        style={{ backgroundColor: generatePercentageColor(card.understanding)}}
        className="p-1 rounded-lg mr-2 w-20 text-center text-itext font-bold"
      >
        {percentUnderstood}%
      </div>
      <div>
        {card.question}
      </div>
    </div>
  )
}


export default function Summary() {
  const cards = getCards()

  if (cards == null) {
    return <div>Loading cards...</div>
  }

  // Runs if the user hasn't added any cards.
  if (cards.length == 0) {
    return <div>Add a card and start studying to see your summary!</div>
  }

  return (
    <div>
      <h1>Summary</h1>
      <div className="bg-secondary m-8 p-4 rounded-lg">
        {
          cards.map((card: Card) => (
            <CardReport card={card}/>
          ))
        }
      </div>
    </div>
  )
}
