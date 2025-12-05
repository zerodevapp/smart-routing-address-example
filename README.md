# Smart Routing Address

Smart Routing Address is a cross-chain token bridging solution that allows users to send tokens to a single address and automatically bridge them to destination chain. 

## Quick Start

```bash
# Install dependencies
bun install  # or `npm install`

# Run vanilla example (user pays fees)
npx ts-node src/index.ts

# Run sponsored example (developer pays fees)
npx ts-node src/sponsor.ts
```

## Examples

This project contains:

- **`src/index.ts`** - Vanilla smart routing address where users pay bridging fees
- **`src/sponsor.ts`** - Developer-sponsored fees (requires `ZERODEV_PROJECT_ID` in `.env`)

## Environment Setup (For Sponsored Fees)

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
