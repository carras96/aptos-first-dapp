import React, { Component } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Wallet from './Wallet';

const WalletsList = () => {
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
      return <div>
        {
          wallets.map((item, index) => <Wallet walletData={item} key={index}/>)
        }
      </div>
}

export default WalletsList;