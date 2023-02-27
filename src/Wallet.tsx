import React, { Component, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient, CoinClient, Types } from "aptos";
import BigNumber from "bignumber.js";
const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1");
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

  const coinClient = new CoinClient(aptosClient);

  const [balance, setBalance] = useState<number>(0);

  //   console.log(account);

//   const [accountHasList, setAccountHasList] = useState<boolean>(false);

//   const fetchList = async () => {
//     if (!account) return [];
//     // change this to be your module account address
//     const moduleAddress =
//       "0xcbddf398841353776903dbab2fdaefc54f181d07e114ae818b1a67af28d1b018";
//     try {
//       const TodoListResource = await aptosClient.getAccountResource(
//         account.address,
//         `${moduleAddress}::todolist::TodoList`
//       );
//       console.log(TodoListResource);
//       setAccountHasList(true);
//     } catch (e: any) {
//       setAccountHasList(false);
//     }
//   };

  useEffect(() => {
    if (account) {
    //   fetchList();
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
      arguments: [account?.address, 1], // 1 is in Octas
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
          <button onClick={disconnect}>Disconnect</button>
          <button onClick={onSignAndSubmitTransaction}>
            Sign and submit transaction
          </button>
          <button onClick={onSignMessage}>Sign message</button>
          <button onClick={onSignTransaction}>Sign transaction</button>
          <button onClick={onSignMessageAndVerify}>
            Sign message and verify
          </button>
        </>
      )}

      <br />
    </>
  );
};

export default Wallet;
