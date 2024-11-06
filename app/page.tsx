import Link from "next/link"


export default function Home() {
  return (
    <div>
      <h1>Welcome to</h1>
      <h1 className="text-7xl mb-12">
        Repetition
      </h1>
      <Link href="\add" className="standard-button">
        Add a card
      </Link>
    </div>
  )
}
