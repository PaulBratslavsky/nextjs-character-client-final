"use client";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="p-6">
      <h2>Something went wrong when getting your character!</h2>
    </div>
  );
}