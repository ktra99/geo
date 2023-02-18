import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useState } from "react";
import countries from "../countries.json";

const scoreAtom = atom(0);
const roundAtom = atom(0);
const openAtom = atom(false);
const selectedAtom = atom(null);
const randomAtom = atom(Math.floor(Math.random() * (10 - 6 + 1) + 6));
const currentAtom = atom(
  countries[Math.floor(Math.random() * countries.length)]
);

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function Modal() {
  const [_, setScore] = useAtom(scoreAtom);
  const [open, setOpen] = useAtom(openAtom);
  const [rounds, setRounds] = useAtom(roundAtom);
  const continuePlaying = () => {
    setScore(0);
    setRounds(0);
    setOpen(false);
  };
  useEffect(() => {
    if (rounds === 10) setOpen(true);
  }, [rounds, setOpen]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <img
                      className="max-w-[30rem]"
                      src="undraw_under_construction_46pa.png"
                      alt="under construction"
                    />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Leaderboard coming soon
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={continuePlaying}
                  >
                    Continue playing
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Navbar() {
  return (
    <div className="p-4">
      <nav className="flex items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="https://www.ktra99.dev/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ktra99</span>
            <img className="h-6 w-6" src="/logo.png" alt="avatar" />
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <a
            href="https://github.com/ktra99/ecommerce"
            className="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
}

function Score() {
  const [score] = useAtom(scoreAtom);
  return (
    <span className="my-12 block text-center text-2xl font-semibold sm:mb-6">
      Your score: {score}
    </span>
  );
}

function Rounds() {
  const [rounds] = useAtom(roundAtom);
  return (
    <div className="mt-6" aria-hidden="true">
      <div className="overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-black transition-all duration-300"
          style={{ width: (rounds / 10) * 100 + "%" }}
        />
      </div>
    </div>
  );
}

function Cards() {
  const [score] = useAtom(scoreAtom);
  const [options, setOptions] = useState([]);
  const [currentCountry] = useAtom(currentAtom);
  const [selected, setSelected] = useAtom(selectedAtom);
  useEffect(() => {
    if (currentCountry) {
      const list = [currentCountry];
      while (list.length < 3) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        if (
          country !== currentCountry &&
          list.find((item) => item.name === country.name) === undefined
        ) {
          list.push(country);
        }
      }
      setOptions(shuffle(list));
    }
  }, [currentCountry]);
  return (
    <RadioGroup
      key={score}
      value={selected}
      onChange={setSelected}
      className="w-full sm:w-auto"
    >
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {options.map((country, index) => (
          <RadioGroup.Option
            key={index}
            value={country}
            className={({ checked, active }) =>
              clsx(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-black ring-2 ring-black" : "",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition duration-300 focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {country.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500 sm:w-48"
                    >
                      {country.description}
                    </RadioGroup.Description>
                  </span>
                </span>
                <CheckCircleIcon
                  className={clsx(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-black"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={clsx(
                    active ? "border" : "border-2",
                    checked ? "border-black" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

function Buttons() {
  const [_open, setOpen] = useAtom(openAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const [rounds, setRounds] = useAtom(roundAtom);
  const [_random, setRandom] = useAtom(randomAtom);
  const [currentCountry, setCurrentCountry] = useAtom(currentAtom);
  const [selectedCountry, setSelectedCountry] = useAtom(selectedAtom);
  const handleOnClick = () => {
    const list = countries.filter(
      (country) => country.name !== currentCountry.name
    );
    if (selectedCountry.position === currentCountry.position)
      setScore(score + 1);
    setRounds(rounds + 1);
    setSelectedCountry(null);
    setRandom(Math.floor(Math.random() * (10 - 6 + 1) + 6));
    setCurrentCountry(list[Math.floor(Math.random() * list.length)]);
  };
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleOnClick}
        className="w-full rounded-lg border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        disabled={!selectedCountry || rounds >= 10}
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border-2 border-black px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        Leaderboard
      </button>
    </div>
  );
}

export default function Home() {
  const [map, setMap] = useState();
  const [random] = useAtom(randomAtom);
  const [marker, setMarker] = useState();
  const [currentCountry] = useAtom(currentAtom);
  const [mapContainer, setMapContainer] = useState();

  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  const mapOptions = {
    center: currentCountry.position,
    zoom: random,
    disableDefaultUI: true,
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
    keyboardShortcuts: false,
  };

  const onLoadMap = (map) => setMap(map);

  useEffect(() => {
    if (!map) return;
    if (marker) {
      marker.setPosition(currentCountry.position);
    } else {
      setMarker(
        new google.maps.Marker({
          position: currentCountry.position,
          map,
        })
      );
    }
    map.setZoom(random);
    map.setCenter(currentCountry.position);
  }, [map, currentCountry]);

  return (
    <>
      <Modal />
      <Navbar />
      <GoogleMapsProvider
        googleMapsAPIKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        onLoadMap={onLoadMap}
      >
        <div className="my-12 flex-col items-center justify-center sm:flex">
          <div
            ref={mapRef}
            className="mx-auto h-64 w-64 rounded-full sm:h-96 sm:w-96"
          />
          <Score />
          <div className="space-y-6 px-4 sm:space-y-12">
            <Rounds />
            <Cards />
            <Buttons />
          </div>
        </div>
      </GoogleMapsProvider>
    </>
  );
}
