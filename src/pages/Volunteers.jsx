import { useStore } from "../store";
import { useParams, A } from "@solidjs/router";
import { Show, For } from "solid-js";
import { TeamNames } from "../constants";

function List() {
  const [state] = useStore();
  return (
    <div className="m-auto w-fit grid grid-cols-4 p-4 gap-4">
      <For each={Object.keys(state.users)} fallback={<div>Loading...</div>}>
        {(user) => <A href={`/volunteers/${user}`}>{user}</A>}
      </For>
    </div>
  );
}

function Card(props) {
  const [state, { cancelShift }] = useStore();
  const params = useParams();

  return (
    <div className="border-2 flex gap-4 p-2 justify-between">
      <h1 className="text-2xl">
        {`${state.dates[props.id].toLocaleDateString("en-DK", {
          dateStyle: "short",
        })} as ${
          TeamNames[state.schedule[props.id].volunteers[params.name]].singular
        }`}
      </h1>
      <h2 className="">{}</h2>
      <Show when={params.name === state.user}>
        <button
          onClick={() => cancelShift(props.id)}
          className="bg-red-300 px-4 font-bold hover:bg-red-200"
        >
          REMOVE
        </button>
      </Show>
    </div>
  );
}

function Shifts(props) {
  const [state, { createShifts }] = useStore();
  const shifts = createShifts(() => props.user)

  return (
    <div className="grid grid-cols-1 gap-2 m-auto w-fit p-2">
      <h1 className="text-5xl font-bold text-center">{props.user}'s shifts</h1>
      <For
        each={Object.values(shifts().user)}
        fallback={<div className="text-center">No shifts!</div>}
      >
        {(id) => <Card id={id} />}
      </For>
    </div>
  );
}

function Volunteers() {
  const params = useParams();

  return <Show when={params.name} fallback={List}><Shifts user={params.name}/></Show>;
}

export default Volunteers;
