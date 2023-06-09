import Image from "next/image";

interface CardProps {
  data: {
    name: string;
    gender: string;
    description: string;
    imageUrl: string;
  };
  children?: React.ReactNode;
}

export default function Card({ data, children }: CardProps) {
  const { name, gender, description, imageUrl } = data;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <Image
        className="w-full h-56 object-fit object-top"
        src={`data:image/png;base64, ${imageUrl}`}
        alt={name}
        width={500}
        height={500}
      />
      <div className="py-4 px-6">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{gender}</p>
        <p className="text-gray-700 text-base mt-4">{description}</p>
        { children && children}
      </div>
    </div>
  );
}
