import {
  createSmartRoutingAddress,
  createCall,
  FLEX,
  SMART_ROUTING_ADDRESS_SERVER_URL
} from '@zerodev/smart-routing-address'
import { erc20Abi } from 'viem'
import { base, arbitrum, mainnet, optimism } from 'viem/chains'
import { config } from 'dotenv'

config()

const ZERODEV_PROJECT_ID = process.env.ZERODEV_PROJECT_ID

async function run() {
  // Replace this with an address you want to receive funds on
  const owner = '0xddED85de258cC7a33A61BC6215DD766E87a97070'

  const destChain = base
  const slippage = 5000

  const erc20Call = createCall({
    target: FLEX.TOKEN_ADDRESS,
    value: 0n,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [owner, FLEX.AMOUNT],
  })

  const nativeCall = createCall({
    target: owner,
    value: FLEX.NATIVE_AMOUNT,
  })

  const { smartRoutingAddress, estimatedFees } = await createSmartRoutingAddress({
    destChain,
    owner,
    slippage,
    actions: {
      'USDC': {
        action: [erc20Call],
        fallBack: [erc20Call],
      },
      'WRAPPED_NATIVE': {
        action: [erc20Call],
        fallBack: [erc20Call],
      },
      'NATIVE': {
        action: [nativeCall],
        fallBack: [nativeCall],
      }
    },
    // Source tokens (any ERC20 on arbitrum, ETH on mainnet, USDC on optimism)
    srcTokens: [
      {
        tokenType: 'ERC20',
        chain: arbitrum,
      },
      {
        tokenType: 'NATIVE',
        chain: mainnet
      },
      {
        tokenType: 'USDC',
        chain: optimism
      },
    ],
    config: {
      baseUrl: `${SMART_ROUTING_ADDRESS_SERVER_URL}/${ZERODEV_PROJECT_ID}`
    }
  })

  console.log('Estimated fee per token deposit', JSON.stringify(estimatedFees, null, 2));
  console.log('Smart routing address', smartRoutingAddress)
  console.log('Try sending at least 1 USDC to the smart routing address on any chain (say Arbitrum), and observe that the owner address receives funds on Base.')
}

run().catch((error) => console.error('Error:', error))
