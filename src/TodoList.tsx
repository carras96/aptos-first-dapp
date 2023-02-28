import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import React, { useEffect } from "react";

const aptosClient = new AptosClient(
  "https://fullnode.testnet.aptoslabs.com/v1"
);

const moduleAddress =
      "0x6a1ed7a5dc51b8b1cb6e7986b1d323892286d86521d81bd56b2fe620d382eef7";

const TodoList = () => {
  const { account } = useWallet();

  useEffect(() => {
    if (account) {
      fetchList();
    }
  }, [account]);

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    
    try {
      const TodoListResource = await aptosClient.getAccountResource(
        account.address,
        `${moduleAddress}::todolist::TodoList`
      );
      console.log(TodoListResource);
    } catch (e: any) {}
  };
  return <>test</>;
};

export default TodoList;
