import { useQuery } from "@tanstack/react-query";

export default function useScores() {
  return useQuery(["scores"], async () => {
    const response = (await (await fetch("/api/score")).json())
    return response
  });
};