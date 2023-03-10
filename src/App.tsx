import React, { useEffect, useState } from "react";
import "./App.css";
// import { AptosClient, Types } from 'aptos';

// const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

// function App() {

//   const [address, setAddress] = useState<string>('');
//   const [account, setAccount] = useState<Types.AccountData | null>(null);
//   console.log(account);

//   const init = async() => {
//     // connect
//     const { address, publicKey } = await window.aptos.connect();
//     setAddress(address);
//   }

//   useEffect(() => {
//     init();
//  }, []);

//  useEffect(() => {
//   if (!address) return;
//   client.getAccount(address).then(setAccount);
// }, [address]);

//   return (
//     <div className="App">
//       <p>Account Address: <code>{ address }</code></p>
//       <p>Sequence Number: <code>{ account?.sequence_number }</code></p>
//     </div>
//   );
// }

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import Wallet from "./WalletsList";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import TodoList from "./TodoList";

import { AptosClient, CoinClient } from "aptos";

export const URLChain = "https://fullnode.testnet.aptoslabs.com/v1";
export const aptosClient = new AptosClient(URLChain);
export const coinClient = new CoinClient(aptosClient);
export const moduleAddress =
      "0x6a1ed7a5dc51b8b1cb6e7986b1d323892286d86521d81bd56b2fe620d382eef7";

const App = () => {
  const wallets = [
    new PetraWallet(),
    new MartianWallet(),
    new PontemWallet(),
    new FewchaWallet(),
  ];
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <Wallet />
      <br />
      <hr />
      <br />
      <TodoList />
    </AptosWalletAdapterProvider>
  );
};

export default App;
