import React from "react";
import { useEvent, useStore } from "effector-react/ssr";

import { increment, reset, $idValue } from "./model";

export const Home = () => {
  const id = useStore($idValue);

  const incrementE = useEvent(increment);
  const resetE = useEvent(reset);

  return (
    <div>
      <h1>Id - {id}</h1>
      <button
        onClick={() => {
          incrementE();
        }}
      >
        Incremet
      </button>
      <button
        onClick={() => {
          resetE();
        }}
      >
        resetE
      </button>
    </div>
  );
};
