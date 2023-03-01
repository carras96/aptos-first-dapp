import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import axios from "axios";
import React, { useEffect } from "react";
import { URLChain } from "./App";

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
      if (TodoListResource) {
        const quantityTasks = Number(
          (TodoListResource.data as any).task_counter
        );
        for (let i = 1; i <= quantityTasks; i++) {
          axios
            .post(
              `${URLChain}/tables/${(TodoListResource.data as any).tasks.handle}/item`,
              {
                key_type: "u64",
                value_type: `${moduleAddress}::todolist::Task`,
                key: i.toString(),
              }
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } catch (e: any) {}
  };
  return <>test</>;
};

export default TodoList;
