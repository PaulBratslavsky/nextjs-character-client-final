import React from "react";
import Card from "@/app/components/Card";
import GenerateStory from "@/app/components/GenerateStory";

const getCharacterById = async (id: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const characterResponse = await fetch(`${url}/api/characters/${id}`);
    const characterResponseData = await characterResponse.json();
    if (characterResponseData.error)
      throw new Error(characterResponseData.error);
    return characterResponseData.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};


export default async function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCharacterById("20");
  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      <div className="col-span-3">{children}</div>
      <div className="col-span-1">
        <Card data={data.attributes}>
          <GenerateStory  data={data}/>
        </Card>
      </div>
    </div>
  );
}
