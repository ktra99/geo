import { Score } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useScores() {
  return useQuery(["scores"], async () => {
    const response = (await (await fetch("/api/score", {
      headers: {
        "x-auth-token": process.env.NEXT_PUBLIC_TOKEN as string
      }
    })).json())
    return response as Score[]
  });
};