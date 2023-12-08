import { useStore } from "../store";
import { A } from "@solidjs/router";

function Home() {
  const [state, { setUser }] = useStore();

  function logOutHandler() {
    setUser(null);
  }

  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="flex flex-col mt-4">
        <h1 className="text-5xl font-bold text-center">
          Welcome {state.user}!
        </h1>
        <h2 className="text-xl italic text-center">
          Choose one of the following actions:
        </h2>
        <A
          href="/shifts"
          className="text-center mt-4 p-4 bg-green-400 hover:bg-green-700 cursor-pointer font-bold"
        >
          SIGN UP FOR SHIFTS
        </A>
        <A
          href={`/volunteers/${state.user}`}
          className="text-center mt-4 p-4 bg-green-400 hover:bg-green-700 cursor-pointer font-bold"
        >
          VIEW AND CANCEL MY SHIFTS
        </A>
        <A
          href="/volunteers"
          className="text-center mt-4 p-4 bg-green-400 hover:bg-green-700 cursor-pointer font-bold"
        >
          VIEW FELLOW VOLUNTEERS
        </A>
        <A
          href="/"
          onClick={logOutHandler}
          className="text-center mt-4 p-4 bg-red-400 hover:bg-red-700 cursor-pointer font-bold"
        >
          LOG OUT
        </A>
      </div>
    </div>
  );
}

export default Home;
