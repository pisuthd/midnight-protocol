import {   useEffect, useRef } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { TESTNET_TOKENS, ERC20_ABI, validateNetwork } from '../utils/tokenConfig';
import { parseUnits } from 'viem';

interface UseFaucetOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useFaucet = ({ onSuccess, onError }: UseFaucetOptions = {}) => {
  const { address, chainId } = useAccount();
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  
  const processedTransactions = useRef<Set<string>>(new Set());

  // Faucet amounts for each token
  const FAUCET_AMOUNTS = {
    USDC: '1000', // 1000 USDC
    SOMNIA: '10000', // 10000 SOMNIA
    ETH: '5' // 5 ETH
  };

  // Handle success when transaction is confirmed
  useEffect(() => {
    if (isConfirmed && hash && !processedTransactions.current.has(hash)) {
      console.log('✅ Transaction confirmed:', hash);
      processedTransactions.current.add(hash);
      onSuccess?.();
    }
  }, [isConfirmed, hash]);

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      console.error('❌ Faucet write error:', writeError);
      onError?.(writeError.message || 'Failed to send transaction');
    }
  }, [writeError]);

  const claimTokens = async (tokenSymbol: keyof typeof TESTNET_TOKENS) => {
    console.log('🚀 Starting claim for:', tokenSymbol);
    console.log('📍 Address:', address);
    console.log('🌐 Chain ID:', chainId);
    
    if (!address || !chainId) {
      console.error('❌ Wallet not connected');
      onError?.('Wallet not connected');
      return;
    }

    if (!validateNetwork(chainId)) {
      console.error('❌ Wrong network. Current:', chainId, 'Expected: 50312');
      onError?.('Please switch to Somnia Testnet');
      return;
    }

    const token = TESTNET_TOKENS[tokenSymbol];
    const amount = FAUCET_AMOUNTS[tokenSymbol];

    if (!token || !amount) {
      console.error('❌ Token not supported:', tokenSymbol);
      onError?.('Token not supported for faucet');
      return;
    }

    try {
      const parsedAmount = parseUnits(amount, token.decimals);
      console.log('📊 Parsed amount:', parsedAmount.toString());
      
      const contractCall: any = {
        address: token.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'mint',
        args: [address, parsedAmount],
      };
      
      console.log('🔗 Calling writeContract with:', contractCall);
      
      writeContract(contractCall);
      
      console.log('✅ writeContract called successfully');
    } catch (error) {
      console.error('❌ Faucet error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to claim tokens');
    }
  };

  const getFaucetInfo = (tokenSymbol: keyof typeof TESTNET_TOKENS) => {
    const amount = FAUCET_AMOUNTS[tokenSymbol];
    
    return {
      amount,
      canClaim: true // Always allow claiming
    };
  };

  return {
    claimTokens,
    getFaucetInfo,
    isLoading: isPending || isConfirming,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
};
