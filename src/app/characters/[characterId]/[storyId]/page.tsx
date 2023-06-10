import BackButton from "@/app/components/BackButton";
import RichText from "@/app/components/RichText";

const getCharacterStoryById = async (id: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const characterStoryResponse = await fetch(`${url}/api/stories/${id}`, {
      next: { revalidate: 60 },
    });
    const characterStoryResponseData = await characterStoryResponse.json();
    if (characterStoryResponseData.error)
      throw new Error(characterStoryResponseData.error);
    return characterStoryResponseData.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default async function StoryRoute({ params }: { params: any }) {
  const id = params.storyId;
  const data = await getCharacterStoryById(id);
  if (!data) return null;
  return (
    <div>
      <RichText content={data.attributes.content} />
      <BackButton
        href={`/characters/${params.characterId}`}
        buttonText="[ Back to articles ]"
      />
    </div>
  );
}
