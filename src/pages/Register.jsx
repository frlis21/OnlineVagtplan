import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { useStore } from "../store";

function Register() {
  const [state, { addUser }] = useStore();
  const navigate = useNavigate();
  const inputClasses = "border-2 w-full";
  let nameRef, passwordRef;

  function handleSubmit(e) {
    e.preventDefault();
    addUser(nameRef.value, passwordRef.value);
    navigate("/");
  }

  return (
    <>
      <form role="registerform" onSubmit={handleSubmit} className="flex flex-col px-16 py-8">
        <div>
          <label for="Name">Name:</label>
          <br />
          <input
            role="name"
            className={inputClasses}
            id="name"
            type="text"
            ref={nameRef}
          ></input>
        </div>
        <div>
          <label for="password">Password:</label>
          <br />
          <input
            role="password"
            className={inputClasses}
            id="password"
            type="password"
            ref={passwordRef}
          ></input>
        </div>
        <button
          role="register"
          className="text-center mt-4 p-4 bg-green-400 hover:bg-green-700 cursor-pointer font-bold"
        >
          REGISTER
        </button>
      </form>
      <h2 className="text-center italic text-2xl">Already have an account?</h2>
      <A
        role="gologin"
        href="/"
        className="text-center mt-4 mx-16 p-4 bg-orange-400 hover:bg-orange-700 cursor-pointer font-bold"
      >
        LOG IN
      </A>
    </>
  );
}

export default Register;
