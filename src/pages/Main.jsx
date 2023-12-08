import { createSignal, Show } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Portal from "./Portal";
import Home from "./Home";
import Shifts from "./Shifts";
import Volunteers from "./Volunteers";
import { useStore } from "../store";

function Main() {
  const [state] = useStore();

  return (
    <Show when={state.user} fallback={<Portal />}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/shifts" component={Shifts} />
        <Route path="/volunteers/:name?" component={Volunteers} />
      </Routes>
    </Show>
  );
}

export default Main;
