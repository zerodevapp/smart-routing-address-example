# Smart Routing Address

Smart Routing Address is a cross-chain token bridging solution that allows users to send tokens to a single address and automatically bridge them to destination chain. 

## Quick Start

```bash
# Install dependencies
bun install  # or `npm install`

# Create a smart routing address (direct mode)
npx ts-node src/create-sra-direct-mode.ts

# Create a smart routing address (execute mode)
npx ts-node src/create-sra-execute-mode.ts
```

## Examples

Core: creating a smart routing address, in one of two modes.

- **`src/create-sra-direct-mode.ts`** - Direct mode: deposited tokens are bridged and delivered as the configured asset to the recipient
- **`src/create-sra-execute-mode.ts`** - Execute mode: deposited tokens are bridged and then arbitrary calls run on the destination chain

Helpers:

- **`src/status.ts`** - Query the status of an existing smart routing address
- **`src/withdrawTokens.ts`** - Build the calls needed to withdraw stuck tokens from a smart routing address

## Environment Setup

Create a `.env` file:
```env
ZERODEV_PROJECT_ID=your_project_id_here
```

## How to Test

1. Run either example to get your smart routing address
2. Send tokens to the smart routing address from supported chains (Arbitrum, Mainnet, Optimism)
3. Check the destination chain (Base) to see tokens received

## Documentation

For comprehensive documentation, configuration options, and advanced usage, visit the official ZeroDev Smart Routing Address documentation:

**📚 [https://docs.zerodev.app/smart-routing-address](https://docs.zerodev.app/smart-routing-address)**
