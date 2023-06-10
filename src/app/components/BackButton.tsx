"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton({ href, buttonText }: { href: string, buttonText?: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href) } className="text-xl text-yellow-500">
      {buttonText || "Back"}
    </button>
  )
}

