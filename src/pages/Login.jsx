import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useStore } from "../store";

function Login() {
  const [state, { setUser }] = useStore();
  const inputClasses = "border-2 w-full";
  let nameRef, passwordRef;

  function handler(event) {
    event.preventDefault();
    const user = nameRef.value,
      password = passwordRef.value;
    if (user in state.users && state.users[user].password === password) {
      setUser(user);
    } else {
      nameRef.value = "";
      passwordRef.value = "";
    }
  }

  return (
    <>
      <form role="loginform" onSubmit={handler} className="flex flex-col px-16 py-8">
        <div>
          <label for="name">Name:</label>
          <br />
          <input
            role="name"
            ref={nameRef}
            className={inputClasses}
            id="name"
            type="text"
          ></input>
        </div>
        <div>
          <label for="password">Password:</label>
          <br />
          <input
            role="password"
            ref={passwordRef}
            className={inputClasses}
            id="password"
            type="password"
          ></input>
        </div>
        <button
          role="login"
          className="mt-4 p-4 bg-green-400 hover:bg-green-700 cursor-pointer font-bold"
          type="submit"
        >
          LOG IN
        </button>
      </form>
      <h2 className="text-center italic text-2xl">Don't have an account?</h2>
      <A
        role="goregister"
        href="/register"
        className="mt-4 mx-16 p-4 bg-orange-400 hover:bg-orange-700 cursor-pointer font-bold text-center"
      >
        REGISTER HERE
      </A>
    </>
  );
}

export default Login;
