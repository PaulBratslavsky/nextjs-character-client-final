import RichText from "./RichText";

export default function Card({ data, children }: any) {
  const characterName = data.attributes.character.data.attributes.name;

  return (
    <div className="max-w-sm mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <div className="py-4 px-6">
        <h2 className="text-2xl font-semibold text-gray-400">Character: {characterName}</h2>
        <RichText content={data.attributes.content.slice(0,156) + "..."} /> 
        <span className="text-xl"><span className="text-pink-500">[</span> Read More... <span className="text-pink-500">]</span></span>
        { children && children}
      </div>
    </div>
  );
}
