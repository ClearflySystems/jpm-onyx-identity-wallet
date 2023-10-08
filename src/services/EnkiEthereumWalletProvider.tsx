import React, {useEffect, useState} from 'react';
import { ethers, Wallet } from 'ethers';
import {useEffectOnce} from "usehooks-ts";

type Props = {
  children?: React.ReactNode
};

const EnkiEthereumWalletProvider: React.FC<Props> = ({ children }) => {

  /**
   * Get/Set current wallets list
   */
  const [ethWallets, setEthWallets] = useState<Wallet[]>([]);

  /**
   * Get/Set current account wallet index
   */
  const [curWalletIndex, setCurWalletIndex] = useState<number>(0);

  /**
   * State store of current balance
   */
  const [ethBalance, setEthBalance] = useState<string>('0');

  /**
   * State store of current balance
   */
  const [lastMessage, setLastMessage] = useState<string>('Init');

  /**
   * Return current Wallet
   */
  const getCurrentWallet = () => {
    return ethWallets[curWalletIndex];
  }

  /**
   * Refresh current Wallet Balance
   */
  const refreshWalletBalance = async (wallet:Wallet) => {
    if (wallet && wallet.provider) {
      // Get the ETH balance of the connected account
      // TODO - add caching
      const balance = await wallet.provider.getBalance(wallet.address);
      setEthBalance(ethers.formatEther(balance));
    }
  }

  /**
   * Setup our provider and build list of wallets
   * TODO - allow these to be user definable instead of env vars
   */
  useEffectOnce(() => {
    async function setupEthProvider() {
      const provider = await new ethers.AlchemyProvider(
        'goerli',
        process.env.REACT_APP_ALCHEMY_API_KEY
      );
      let wallets: Wallet[] = [];
      wallets.push(
        new ethers.Wallet(process.env.REACT_APP_ETHEREUM_PRIVATE_KEY_1 || '', provider),
        new ethers.Wallet(process.env.REACT_APP_ETHEREUM_PRIVATE_KEY_2 || '', provider)
      );
      setEthWallets(wallets);
    }
    setupEthProvider();
  });

  /**
   * When changing current wallet index refresh balance
   */
  useEffect(() => {
    async function callRefreshWalletBalance() {
      await refreshWalletBalance(getCurrentWallet());
    }
    if(ethWallets.length) {
      callRefreshWalletBalance();
    }
  }, [curWalletIndex, ethWallets.length]);

  return (
    <EnkiEthWalletProviderContext.Provider value={{
      getCurrentWallet,
      ethBalance,
      curWalletIndex,
      setCurWalletIndex,
      lastMessage,
      setLastMessage
    }} >
      {children}
    </EnkiEthWalletProviderContext.Provider>
  );
};

export const useEnkiEthereumWalletProvider = () => {
  const context = React.useContext(EnkiEthWalletProviderContext);
  if (context === undefined) {
    throw new Error('useEnkiEthereumWalletProvider must be used within a EnkiEthereumWalletProvider');
  }
  return context;
};

export default EnkiEthereumWalletProvider;

export const EnkiEthWalletProviderContext = React.createContext<any>(null);
