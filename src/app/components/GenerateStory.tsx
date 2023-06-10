"use client";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Form from "@/app/components/Form";

interface GenerateStoryProps {
  data: {
    id: string;
    attributes: {
      name: string;
      gender: string;
      description: string;
      personaPrompt: string;
      imagePrompt: string;
      character: string;
    };
  };
}

export default function GenerateCharacter(data: GenerateStoryProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);

  const generateStoryAndSave = async (
    e: React.FormEvent<HTMLFormElement>,
    data: GenerateStoryProps
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const storyPrompt = {
      data: {
        name: data.data.attributes.name,
        gender: data.data.attributes.gender,
        description: data.data.attributes.description,
        personaPrompt: data.data.attributes.personaPrompt,
        imagePrompt: data.data.attributes.imagePrompt,
      }
    }

    try {
      const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

      const generateResponse = await fetch(`${url}/api/stories/generateStory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyPrompt),
      });

      const generateResponseData = await generateResponse.json();
      if (generateResponseData.error)
        throw new Error(generateResponseData.error);

      const storyData = {
        data: {
          character: data.data.id,
          content: generateResponseData.data.text,
          prompt: generateResponseData.data.prompt,
        }
      };

      const saveResponse = await fetch(
        `${url}/api/stories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storyData),
        }
      );

      const saveResponseData = await saveResponse.json();
      if (saveResponseData.error)
        throw new Error(saveResponseData.error);

        router.push(`/characters/${data.data.id}/${saveResponseData.data.id}`)

    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={(e: any) => generateStoryAndSave(e, data)}
      loading={loading}
      buttonText="Generate Story"
      loadingText="Generating Story"
    />
  );
}
