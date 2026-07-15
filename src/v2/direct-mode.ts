import {
  createSmartRoutingAddress,
  SMART_ROUTING_ADDRESS_V1_0_0_ALPHA_0,
} from '@zerodev/smart-routing-address'
import { base, arbitrum, mainnet, optimism } from 'viem/chains'
import { config } from "dotenv";
config();

const ZERODEV_PROJECT_ID = process.env.ZERODEV_PROJECT_ID;
if (!ZERODEV_PROJECT_ID) {
  throw new Error("ZERODEV_PROJECT_ID is required")
}

async function run() {

  // Replace this with an address you want to receive funds on
  const owner = '0xddED85de258cC7a33A61BC6215DD766E87a97070'

  const destChain = base
  const slippage = 5000

  const { smartRoutingAddress, estimatedFees } = await createSmartRoutingAddress({
    destChain,
    owner,
    slippage,
    recipient: owner,
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
    version: SMART_ROUTING_ADDRESS_V1_0_0_ALPHA_0,
    projectId: ZERODEV_PROJECT_ID!
  })

  console.log('Estimated fee per token deposit', JSON.stringify(estimatedFees, null, 2));
  console.log('Smart routing address', smartRoutingAddress)
  console.log('Try sending at least 1 USDC to the smart routing address on any chain (say Arbitrum), and observe that the owner address receives funds on Base.')
}

run().catch((error) => console.error('Error:', error))
