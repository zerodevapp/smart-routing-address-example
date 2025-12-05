import { getSmartRoutingAddressStatus } from "@zerodev/smart-routing-address";

async function main() {
    const status = await getSmartRoutingAddressStatus({
        smartRoutingAddress: '0x086f37068C865116dA5D7576dd87E05D52AECfb1',
    });
    console.log(status);
}

main();