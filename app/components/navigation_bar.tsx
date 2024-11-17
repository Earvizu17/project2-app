import Link from "next/link";

export default function NavigationBar() {
  const title = "Repetition";
  const titlePath = "/";

  interface Page {
    name: string;
    path: string;
  }

  const pages: Page[] = [
    { name: "Add Card", path: "/add" },
    { name: "Study", path: "/study" },
    { name: "Summary", path: "/summary" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Title */}
        <Link
          href={titlePath}
          className="text-3xl text-white font-bold hover:text-yellow-300 transition-all"
        >
          {title}
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {pages.map((page, index) => (
            <Link
              href={page.path}
              key={index}
              className="text-lg text-white hover:text-yellow-300 p-2 transition-all rounded-lg hover:bg-white/20"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
