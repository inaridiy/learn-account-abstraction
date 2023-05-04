export type Account = {
  address: string;
  shortAddress: string;
};

export type Network = {
  id: number;
  name: string;
};

export type ContractSummary = {
  name: string;
  abi: any;
  deploy: {
    [chainId in number]: {
      address: string;
      explorer: string;
    };
  };
};
