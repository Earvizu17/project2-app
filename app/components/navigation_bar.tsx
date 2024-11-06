import Link from "next/link"


export default function NavigationBar() {
  const title = "Repetition"
  const titlePath = "/"

  interface Page {
    name: string
    path: string
  }

  const pages: Page[] = [
    {name: "Add Card", path: "/add"},
    {name: "Study", path: "/study"},
    {name: "Summary", path: "/summary"},
  ]

  return (
    <nav className="bg-secondary flex content-center justify-center">
      <Link href={titlePath}
        className="text-xl text-accent text-center m-2 inline-block py-1 drop-shadow-[0_0_5px_#e7513388]"
      >
        {title}
      </Link>
      {
        pages.map((page) => (
          <Link href={page.path} className="m-2 text-center bg-background p-2 rounded-lg">
            {page.name}
          </Link>
        ))
      }
    </nav>
  )
}
