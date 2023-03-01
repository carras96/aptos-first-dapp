import React, { Component, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosAccount, AptosClient, CoinClient, Types } from "aptos";
import BigNumber from "bignumber.js";
import { aptosClient, coinClient, moduleAddress } from "./App";

const Wallet = ({ walletData }: any) => {
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (account) {
      coinClient.checkBalance(account.address).then((data) => {
        const balanceVal = new BigNumber(Number(data))
          .dividedBy(Math.pow(10, 8))
          .toNumber();
        setBalance(balanceVal);
      });
    }
  }, [account]);

  const onSignAndSubmitTransaction = async () => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x1::coin::transfer",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [account?.address, 1 * Math.pow(10, 8)], // 1 is in Octas
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      // if you want to wait for transaction
      await aptosClient.waitForTransaction(response?.hash || "");
      console.log(response?.hash);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const onSignMessage = async () => {
    const payload = {
      message: "Hello from Aptos Wallet Adapter",
      nonce: "random_string",
    };
    try {
      const response = await signMessage(payload);
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const onSignTransaction = async () => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x1::coin::transfer",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [account?.address, 1], // 1 is in Octas
    };
    try {
      const response = await signTransaction(payload);
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const onSignMessageAndVerify = async () => {
    const payload = {
      message: "Hello from Aptos Wallet Adapter",
      nonce: "random_string",
    };
    try {
      const response = await signMessageAndVerify(payload);
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const onTransfer2APT = async () => {
    if (account) {
      const payload: Types.TransactionPayload = {
        type: "entry_function_payload",
        function: `0x1::coin::transfer`,
        type_arguments: [`0x1::aptos_coin::AptosCoin`],
        arguments: ['0xc410a8a75157050153c2bbcae5270cbf2533759258f17d3eea44e242a862b6f3', 2 * Math.pow(10, 8)], // 2 is in Octas
      };
      try {
        const response = await signAndSubmitTransaction(payload);
        // if you want to wait for transaction
        await aptosClient.waitForTransaction(response?.hash || "");
        console.log(response?.hash);
      } catch (error: any) {
        console.log("error", error);
      }
    }
  };

  const addNewList = async () => {
    if (!account) return [];
    // build a transaction payload to be submited
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::todolist::create_list`,
      type_arguments: [],
      arguments: [],
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await aptosClient.waitForTransaction(response.hash);
    } catch (error: any) {
    }
  };

  const addNewTask = async () => {
    if (!account) return [];
    // build a transaction payload to be submited
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::todolist::create_task`,
      type_arguments: [],
      arguments: ['hihihihihihihihihihih'],
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await aptosClient.waitForTransaction(response.hash);
    } catch (error: any) {
    }
  };

  return (
    <>
      <span>
        {walletData?.name}{" "}
        <span>
          {walletData?.name === wallet?.name && connected && `(${balance} APT)`}
        </span>
      </span>
      {walletData?.name !== wallet?.name && (
        <button onClick={() => connect(walletData.name)}>Connect</button>
      )}

      {walletData?.name === wallet?.name && connected && (
        <>
          {/* 
          <button onClick={onSignAndSubmitTransaction}>
            Sign and submit transaction
          </button>
          <button onClick={onSignMessage}>Sign message</button>
          <button onClick={onSignTransaction}>Sign transaction</button>
          <button onClick={onSignMessageAndVerify}>
            Sign message and verify
          </button> */} 
          <button onClick={disconnect}>Disconnect</button>
          <button onClick={onTransfer2APT}>Tranfer</button>
          <button onClick={addNewList}>Add New List</button> 
          <button onClick={addNewTask}>Add New Task</button>
        </>
      )}

      <br />
    </>
  );
};

export default Wallet;
