// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module "*.svg" {
  const src: string;
  export default src;
}

declare let INITIAL_STATE: Record<string, unknown>;
