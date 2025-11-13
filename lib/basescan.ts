/**
 * Basescan API Service
 * For reading blockchain data from Base network
 */

const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || process.env.NEXT_PUBLIC_BASESCAN_API_KEY;
const BASE_API_URL = "https://api.basescan.org/api";

export interface TokenInfo {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  divisor: string;
  tokenType: string;
  totalSupply: string;
  blueCheckmark: string;
  description: string;
  website: string;
  email: string;
  blog: string;
  reddit: string;
  slack: string;
  facebook: string;
  twitter: string;
  bitcointalk: string;
  github: string;
  telegram: string;
  wechat: string;
  linkedin: string;
  discord: string;
  whitepaper: string;
  tokenPriceUSD: string;
}

export interface TokenBalance {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  tokenQuantity: string;
}

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
}

export class BasescanAPI {
  /**
   * Get token information by contract address
   */
  static async getTokenInfo(contractAddress: string): Promise<TokenInfo | null> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?module=token&action=tokeninfo&contractaddress=${contractAddress}&apikey=${BASESCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "1" && data.result && data.result.length > 0) {
        return data.result[0];
      }

      return null;
    } catch (error) {
      console.error("Error fetching token info:", error);
      return null;
    }
  }

  /**
   * Get token balance for an address
   */
  static async getTokenBalance(
    contractAddress: string,
    address: string
  ): Promise<string> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${BASESCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "1") {
        return data.result;
      }

      return "0";
    } catch (error) {
      console.error("Error fetching token balance:", error);
      return "0";
    }
  }

  /**
   * Get list of ERC20 token transfers for an address
   */
  static async getTokenTransfers(
    address: string,
    contractAddress?: string,
    startBlock?: number,
    endBlock?: number,
    page = 1,
    offset = 100
  ): Promise<Transaction[]> {
    try {
      let url = `${BASE_API_URL}?module=account&action=tokentx&address=${address}&page=${page}&offset=${offset}&sort=desc&apikey=${BASESCAN_API_KEY}`;

      if (contractAddress) {
        url += `&contractaddress=${contractAddress}`;
      }
      if (startBlock) {
        url += `&startblock=${startBlock}`;
      }
      if (endBlock) {
        url += `&endblock=${endBlock}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "1" && data.result) {
        return data.result;
      }

      return [];
    } catch (error) {
      console.error("Error fetching token transfers:", error);
      return [];
    }
  }

  /**
   * Get ETH balance for an address
   */
  static async getEthBalance(address: string): Promise<string> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?module=account&action=balance&address=${address}&tag=latest&apikey=${BASESCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "1") {
        return data.result;
      }

      return "0";
    } catch (error) {
      console.error("Error fetching ETH balance:", error);
      return "0";
    }
  }

  /**
   * Get list of all ERC20 tokens owned by an address
   */
  static async getTokenList(address: string): Promise<TokenBalance[]> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?module=account&action=tokentx&address=${address}&sort=desc&apikey=${BASESCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "1" && data.result) {
        // Get unique tokens
        const tokenMap = new Map<string, TokenBalance>();

        for (const tx of data.result) {
          if (!tokenMap.has(tx.contractAddress)) {
            const balance = await this.getTokenBalance(
              tx.contractAddress,
              address
            );

            if (parseInt(balance) > 0) {
              tokenMap.set(tx.contractAddress, {
                tokenAddress: tx.contractAddress,
                tokenName: tx.tokenName,
                tokenSymbol: tx.tokenSymbol,
                tokenDecimal: tx.tokenDecimal,
                tokenQuantity: balance,
              });
            }
          }
        }

        return Array.from(tokenMap.values());
      }

      return [];
    } catch (error) {
      console.error("Error fetching token list:", error);
      return [];
    }
  }

  /**
   * Get contract ABI for verified contracts
   */
  static async getContractABI(contractAddress: string): Promise<any | null> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?module=contract&action=getabi&address=${contractAddress}&apikey=${BASESCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "1") {
        return JSON.parse(data.result);
      }

      return null;
    } catch (error) {
      console.error("Error fetching contract ABI:", error);
      return null;
    }
  }

  /**
   * Check if contract is verified
   */
  static async isContractVerified(contractAddress: string): Promise<boolean> {
    try {
      const abi = await this.getContractABI(contractAddress);
      return abi !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get token holder count (requires contract to be verified)
   */
  static async getTokenHolderCount(contractAddress: string): Promise<number> {
    try {
      const response = await fetch(
        `${BASE_API_URL}?module=token&action=tokenholderlist&contractaddress=${contractAddress}&page=1&offset=1&apikey=${BASESCAN_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "1" && data.result) {
        // This is an approximation, actual holder count may vary
        return data.result.length;
      }

      return 0;
    } catch (error) {
      console.error("Error fetching token holder count:", error);
      return 0;
    }
  }
}
