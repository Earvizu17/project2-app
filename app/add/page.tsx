"use client"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { addCard } from "@/app/components/cards_server"


export default function Add() {
  const textInputClass = "bg-background mx-2 mb-2 p-1 rounded-lg block"

  const [formState, formAction] = useFormState(addCard, "initial")
  const [submitting, setSubmitting] = useState(false)
  const form = useRef<HTMLFormElement>(null)


  useEffect(() => {
    if (formState != "initial" && form.current != null) {
      form.current.reset()
      setSubmitting(false)
    }
    
  }, [formState, submitting])

  return (
    <div>
      <h1>Add a card:</h1>
      <form className="flex flex-col standard-panel items-center" action={formAction} onSubmit={() => setSubmitting(true)} ref={form}>
        <label className="text-center">
          Question:
          <input type="text" name="question" disabled={submitting} className={textInputClass}></input>
        </label>
        <label className="text-center">
          Answer:
          <input type="text" name="answer" disabled={submitting} className={textInputClass}></input>
        </label>
        <label className="text-center">
          understanding:
          <input type="text" name="understanding" disabled={submitting} className={textInputClass}></input>
        </label>
        <button type="submit" disabled={submitting} className="standard-button">
          {submitting ? "Adding card..." : "Add Card"}
        </button>
      </form>
    </div>
  );
}
