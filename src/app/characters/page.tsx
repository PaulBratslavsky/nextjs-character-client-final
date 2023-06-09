import Card from "../components/Card";

const getAllCharacter = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const charactersResponse = await fetch(
      `${url}/api/characters?sort[0]=createdAt:desc`
    );
    const charactersResponseData = await charactersResponse.json();
    if (charactersResponseData.error)
      throw new Error(charactersResponseData.error);
    return charactersResponseData.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default async function CharacterRoute() {
  const data = await getAllCharacter();
  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      {data.map((character: any) => (
        <Card key={character.id} data={character.attributes} />
      ))}
    </div>
  );
}
