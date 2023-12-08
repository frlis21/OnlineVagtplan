import { createSignal } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Login from "./Login";
import Register from "./Register";

function Portal() {
  const inputClasses = "border-2 w-full";

  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-bold text-center">LocalCinema</h1>
        <h2 className="text-3xl text-center italic">volunteer portal</h2>
        <Routes>
          <Route path="/" component={Login} />
          <Route path="/register" component={Register} />
        </Routes>
      </div>
    </div>
  );
}

export default Portal;
