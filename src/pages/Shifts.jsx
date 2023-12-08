import { useStore } from "../store";
import { groupByToObject, groupByToMap } from "../helpers";
import { Show, For, createMemo, createSignal } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import {
  Teams,
  TeamNames,
  JobCapacities,
  START_HOURS,
  BLOCK_SECONDS,
} from "../constants";
import { A } from "@solidjs/router";

const [cart, setCart] = createStore({});

function Overlay(props) {
  return (
    <div
      onClick={props.onClick}
      className="w-full h-full z-50 fixed top-0 left-0 bg-black/50"
    >
      <div className="h-full flex justify-center">
        <div className="flex flex-col justify-center">
          <div onClick={(e) => e.stopPropagation()}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  const [state, { takeShift, cancelShift }] = useStore();
  const [showVolunteers, setShowVolunteers] = createSignal();
  const [showMovies, setShowMovies] = createSignal();
  const usersByTeam = createMemo(() => {
    const empty = Object.fromEntries(
      Object.values(Teams).map((team) => [team, []]),
    );
    const volunteers = state.schedule[props.id].volunteers;
    return Object.assign(
      empty,
      groupByToObject(Object.keys(volunteers), (user) => volunteers[user]),
    );
  });

  return (
    <>
      <Show when={showVolunteers()}>
        <Overlay onClick={() => setShowVolunteers(false)}>
          <div className="bg-white p-4">
            <h1 className="text-2xl">
              {state.dates[props.id].toLocaleDateString("en-DK", {
                dateStyle: "short",
              })}
            </h1>
            <div className="grid grid-flow-col gap-x-4">
              <For
                each={Object.entries(usersByTeam()).sort(([a], [b]) =>
                  TeamNames[a].plural.localeCompare(TeamNames[b].plural),
                )}
              >
                {([team, users]) => (
                  <div className="flex flex-col">
                    <h2 className="text-xl my-1 font-bold">
                      {TeamNames[team].plural.toUpperCase()}
                    </h2>
                    <For each={users}>
                      {(user) => <A href={`/volunteers/${user}`}>{user}</A>}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Overlay>
      </Show>
      <Show when={showMovies()}>
        <Overlay onClick={() => setShowMovies(false)}>
          <div className="bg-white p-4">
            <h1 className="text-2xl">
              {state.dates[props.id].toLocaleDateString("en-DK", {
                dateStyle: "short",
              })}
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <For each={state.schedule[props.id].movies}>
                {(movies, booth) => (
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Booth {booth() + 1}</h2>
                    <For each={movies}>
                      {(movie) => {
                        // XXX: Not reactive but it probably ok
                        const time = new Date(state.dates[props.id]);
                        time.setHours(
                          START_HOURS,
                          0,
                          movie.start * BLOCK_SECONDS,
                        );
                        return (
                          <div className="flex gap-4">
                            <div className="font-mono">
                              {time.toLocaleTimeString("en-DK", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div>{movie.title}</div>
                          </div>
                        );
                      }}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Overlay>
      </Show>
      <div className="flex flex-col border-2 gap-2 p-2">
        <div className="flex justify-between content-center">
          <h1 className="text-2xl">
            {state.dates[props.id].toLocaleDateString("en-DK", {
              dateStyle: "short",
            })}
          </h1>
          <Show when={props.id in cart}>
            <button
              onClick={() => setCart(props.id, undefined)}
              className=" h-full px-2 hover:bg-red-200"
            >
              REMOVE
            </button>
          </Show>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <For each={Object.values(Teams)}>
            {(team) => {
              const cap = JobCapacities[team];
              const taken = () =>
                usersByTeam()[team].length + (cart[props.id] === team ? 1 : 0);
              return (
                <button
                  disabled={!(cart[props.id] === team) && taken() >= cap}
                  onClick={() => setCart(props.id, team)}
                  className={`${
                    cart[props.id] === team
                      ? "bg-blue-500"
                      : "enabled:hover:bg-blue-100"
                  } disabled:hover: disabled:text-gray-400 p-2`}
                >
                  {`${TeamNames[
                    team
                  ].singular.toUpperCase()} (${taken()}/${cap})`}
                </button>
              );
            }}
          </For>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowMovies(true)}
            className="bg-gray-200 hover:bg-gray-700 p-2"
          >
            VIEW MOVIES
          </button>
          <button
            onClick={() => setShowVolunteers(true)}
            className="bg-gray-200 hover:bg-gray-700 p-2"
          >
            VIEW VOLUNTEERS
          </button>
        </div>
      </div>
    </>
  );
}

function Shifts() {
  const [showExit, setShowExit] = createSignal();
  const [state, { createShifts, takeShift }] = useStore();
  const shifts = createShifts(() => state.user);

  return (
    <>
      <Show when={showExit()}>
        <Overlay onClick={() => setShowExit(false)}>
          <div className="bg-white flex flex-col gap-4 p-8">
            <h1 className="text-3xl text-center">Shifts saved!</h1>
            <div className="grid grid-cols-2 gap-8">
              <A href="/" className="text-center p-4 bg-gray-300 hover:bg-gray-200">GO HOME</A>
              <button onClick={() => setShowExit(false)} className="p-4 bg-gray-300 hover:bg-gray-200">GO BACK</button>
            </div>
          </div>
        </Overlay>
      </Show>
      <div className="h-screen flex flex-col">
        <div className="grow grid grid-cols-2 m-auto w-fit gap-x-2 p-4">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-center text-3xl font-bold m-4">Your cart:</h1>
            <For each={Object.keys(cart)}>
              {(id) => <Card user={state.user} id={id} />}
            </For>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-center text-3xl font-bold m-4">
              Available shifts:
            </h1>
            <For each={shifts().others.filter((id) => !(id in cart))}>
              {(id) => <Card user={state.user} id={id} />}
            </For>
          </div>
        </div>
        <div className="sticky bottom-0 inset-x-0 grid grid-cols-2 bg-white p-2 gap-2">
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={() => {
              Object.entries(cart).forEach(([id, role]) => takeShift(id, role));
              setCart(reconcile({}));
              setShowExit(true);
            }}
            className="bg-green-500 font-bold p-2 enabled:hover:bg-green-300"
          >
            SUBMIT
          </button>
          <A
            href="/"
            onClick={() => {
              setCart(reconcile({}));
            }}
            className="text-center bg-red-500 font-bold p-2 hover:bg-red-300"
          >
            EXIT WITHOUT SAVING
          </A>
        </div>
      </div>
    </>
  );
}

export default Shifts;
