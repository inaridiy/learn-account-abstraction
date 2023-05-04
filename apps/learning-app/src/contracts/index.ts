import { entrypointContract } from "./entrypoint";
import { simpleFactoryContract } from "./simple-factory";

export const contracts = {
  entrypoint: entrypointContract,
  simpleFactory: simpleFactoryContract,
} as const;
