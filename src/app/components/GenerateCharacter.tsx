"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Loader from "./Loader";
import Form from "./Form";

export default function GenerateCharacter() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateCharacter = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      const generateResponse = await fetch(
        `${url}/api/characters/generateCharacter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const generateResponseData = await generateResponse.json();
      if (generateResponseData.error) throw new Error(generateResponseData.error);

      setData(generateResponseData.data);

    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveCharacter = async (
    e: React.FormEvent<HTMLFormElement>,
    data: {
      name: string;
      gender: string;
      description: string;
      imageUrl: string;
    }
  ): Promise<void> => {
    e.preventDefault();
    try {
      const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      const imageURL = `data:image/png;base64, ${data.imageUrl}`;
      const myImage = await fetch(imageURL);
      const myBlob = await myImage.blob();

      const formData = new FormData();
      formData.append("data", JSON.stringify({ ...data }));
      formData.append("files.image", myBlob, myBlob.name);
      
      const saveResponse = await fetch(`${url}/api/characters`, {
        method: "POST",
        body: formData,
      });

      const saveResponseData = await saveResponse.json();
      if (saveResponseData.error) throw new Error(saveResponseData.error);

      router.push("/characters");
      
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div>
        {data && (
          <Card data={data}>
            <Form
              onSubmit={(e: any) => saveCharacter(e, data)}
              loading={loading}
              buttonText="Save Character"
            />
          </Card>
        )}
        <Form
          onSubmit={generateCharacter}
          loading={loading}
          buttonText="Generate Character"
        />
      </div>
    </div>
  );
}
