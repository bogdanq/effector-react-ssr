import { createEvent, createStore } from "effector-root";

export const increment = createEvent();
export const reset = createEvent();

export const $idValue = createStore<number>(0);

$idValue.on(increment, (s) => s + 1).reset(reset);
