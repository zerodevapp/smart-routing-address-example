import {
  createSmartRoutingAddress,
  SMART_ROUTING_ADDRESS_V2_0_0_ALPHA_0,
  TOKEN_ADDRESSES,
} from '@zerodev/smart-routing-address'
import { arbitrum, base, robinhood } from 'viem/chains'

async function run() {
  // Replace this with an address you want to receive funds on
  const owner = '0xddED85de258cC7a33A61BC6215DD766E87a97070'

  const destChain = robinhood
  const slippage = 5000

  const { smartRoutingAddress, estimatedFees } = await createSmartRoutingAddress({
    destChain,
    owner,
    slippage,
    recipient: owner,
    actions: {
      'USDC': {
        asset: TOKEN_ADDRESSES[destChain.id].USDG
      },
    },
    srcTokens: [
      {
        tokenType: 'USDC',
        chain: arbitrum,
      },
      {
        tokenType: 'USDC',
        chain: base
      },
    ],
    version: SMART_ROUTING_ADDRESS_V2_0_0_ALPHA_0,
  })

  console.log('Estimated fee per token deposit', JSON.stringify(estimatedFees, null, 2));
  console.log('Smart routing address', smartRoutingAddress)
  console.log('Try sending at least 1 USDC to the smart routing address on any chain (say Arbitrum), and observe that the owner address receives funds on Base.')
}

run().catch((error) => console.error('Error:', error))
