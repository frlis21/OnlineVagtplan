import { createContext, useContext, createMemo } from "solid-js";
import { groupByToObject } from "../helpers";
import { createStore } from "solid-js/store";
import data from "./fakeData";

const StoreContext = createContext();

export function StoreProvider(props) {
  let shiftsByTeams, showingsByDay;
  data.users["admin"] = { password: "password" }; // For debugging
  const [state, setState] = createStore({
    get shiftsByTeams() {
      return shiftsByTeams();
    },
    ...data,
  });
  const actions = {
    setUser: (user) => setState({ user }),
    addUser: (name, password) => setState("users", name, { password }),
    takeShift: (id, role) =>
      setState("schedule", id, "volunteers", state.user, role),
    cancelShift: (id) =>
      setState("schedule", id, "volunteers", state.user, undefined),
    createShifts: (user) =>
      createMemo(() =>
        Object.assign(
          { user: [], others: [] },
          groupByToObject(Array.from(state.schedule.keys()), (id) =>
            user() in state.schedule[id].volunteers ? "user" : "others",
          ),
        ),
      ),
  };

  return (
    <StoreContext.Provider value={[state, actions]}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore: cannot find a StoreContext");
  }
  return context;
}
