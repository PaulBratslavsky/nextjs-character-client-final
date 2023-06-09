import Link from "next/link";

export default function TopNav() {
  return (
    <div className="bg-violet-700 text-white font-bold py-4">
      <nav className="container mx-auto flex flex-row-reverse">
        <Link className="mr-4" href="characters">
          All Characters
        </Link>
        <Link className="mr-4" href="/">
          Generate Character
        </Link>
      </nav>
    </div>
  );
}
