import { ContractSummary } from "@/states/crypto";
import { SIMPLE_FACTORY_ABI } from "./abi";

export const simpleFactoryContract: ContractSummary = {
  name: "SimpleFactory",
  abi: SIMPLE_FACTORY_ABI,
  deploy: {
    137: {
      address: "0x9406Cc6185a346906296840746125a0E44976454",
      explorer: "https://polygonscan.com/address/0x9406Cc6185a346906296840746125a0E44976454",
    },
  },
};
