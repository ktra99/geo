import countries from "@src/countries.json";
import { Country } from "@src/types";
import { atom } from "jotai";

export const RANDOM_MAX = Math.floor(Math.random() * countries.length)
export const RANDOM_MIN_MAX = Math.floor(Math.random() * (10 - 6 + 1) + 6)

export const scoreAtom = atom<number>(0);
export const roundAtom = atom<number>(0);
export const openAtom = atom<boolean>(false);
export const randomAtom = atom<number>(RANDOM_MIN_MAX);
export const selectedAtom = atom<Country | null>(null);
export const markerAtom = atom<google.maps.Marker | null>(null);
export const currentAtom = atom<Country>(
  countries[RANDOM_MAX]
);