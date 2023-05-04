import { ContractSummary } from "@/states/crypto";
import { ENTRYPOINT_ABI } from "./abi";

export const entrypointContract: ContractSummary = {
  name: "Entrypoint",
  abi: ENTRYPOINT_ABI,
  deploy: {
    137: {
      address: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      explorer: "https://polygonscan.com/address/0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    },
  },
};
