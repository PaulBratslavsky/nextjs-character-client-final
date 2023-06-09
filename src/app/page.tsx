import GenerateCharacter from "./components/GenerateCharacter";

export default async function HomeRoute() {
  return (
    <main className="min-h-screen flex justify-center items-center p-24">
      <GenerateCharacter />
    </main>
  )
}
