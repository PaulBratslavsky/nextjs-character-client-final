import Link from "next/link";
import StoryCard from "@/app/components/StoryCard";

const getAllCharacterStories = async (id: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const characterStoriesResponse = await fetch(
      `${url}/api/stories?sort[0]=title:asc&filters[character]=${id}&populate[character][populate]=*`,
      { next: { revalidate: 60 } }
    );
    const characterStoriesResponseData = await characterStoriesResponse.json();
    if (characterStoriesResponseData.error)
      throw new Error(characterStoriesResponseData.error);
    return characterStoriesResponseData.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default async function StoriesRoute({ params }: { params: any }) {
  const id = params.characterId;
  const data = await getAllCharacterStories(id);
  if (!data) return null;
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((story: any) => (
        <Link href={`/characters/${id}/${story.id}`}>
          <StoryCard key={story.id} data={story} />
        </Link>
      ))}
    </div>
  );
}
