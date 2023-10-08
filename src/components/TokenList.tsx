import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TokenList: React.FC<{ wallet: ethers.Wallet }> = ({ wallet }) => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    async function fetchTokens() {
      const tokensInfo: TokenInfo[] = await fetchTokenInfo(wallet);
      setTokens(tokensInfo);
    }
    fetchTokens();
  }, [wallet]);

  return (
    <div>
      <h2>ERC20 Tokens:</h2>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>
            {token.symbol} - {token.balance} {token.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenList;

interface TokenInfo {
  name: string;
  symbol: string;
  balance: string;
}

async function fetchTokenInfo(wallet: ethers.Wallet): Promise<TokenInfo[]> {
  return [];
}
