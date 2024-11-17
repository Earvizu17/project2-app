"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addCard } from "@/app/components/cards_server";

export default function Add() {
  const [formState, formAction] = useFormState(addCard, "initial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState !== "initial" && formRef.current) {
      formRef.current.reset();
      setIsSubmitting(false);
    }
  }, [formState]);

  const handleSubmit = () => setIsSubmitting(true);

  const textInputClass = "w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const labelClass = "block text-sm font-semibold mb-1";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add a New Card</h1>
      <form
        className="flex flex-col"
        action={formAction}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {["Question", "Answer"].map((label) => (
          <div key={label} className="mb-4">
            <label className={labelClass}>{label}:</label>
            <input
              type="text"
              name={label.toLowerCase()}
              disabled={isSubmitting}
              className={textInputClass}
              placeholder={`Enter the ${label.toLowerCase()} here...`}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white font-semibold rounded-lg transition-colors ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Adding card..." : "Add Card"}
        </button>
      </form>
    </div>
  );
}
