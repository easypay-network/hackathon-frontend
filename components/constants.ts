export const apiUrl = "https://api.easypay.network";
export const googleOAuthClientId = "1094710821469-7lg6ktj0bcg2u1m76jg4g5h2ogi3mv2d.apps.googleusercontent.com";

export const KEPLR_WALLET = "keplr";
export const PHANTOM_WALLET = "phantom";

interface ChainInfo {
    rpc: string,
    supportedWallets: string[],
    explorerUrl: string
}

export const supportedNetworks: Map<string, ChainInfo> =  new Map([
    ["osmo-test-5", {
        rpc: "https://rpc.osmotest5.osmosis.zone",
        supportedWallets: [KEPLR_WALLET],
        explorerUrl: "https://www.mintscan.io/osmosis-testnet/tx/{TRX_HASH}"
    }],
    ["juno-1", {
        rpc: "https://rpc.uni.junonetwork.io",
        supportedWallets: [KEPLR_WALLET],
        explorerUrl: "https://www.mintscan.io/juno/tx/{TRX_HASH}"
    }],
    ["axelar-testnet-lisbon-3", {
        rpc: "https://rpc-axelar-testnet.imperator.co",
        supportedWallets: [KEPLR_WALLET],
        explorerUrl: "https://www.mintscan.io/axelar-testnet/tx/{TRX_HASH}"
    }],
    ["pion-1", {
        rpc: "https://rpc.pion.rs-testnet.polypore.xyz",
        supportedWallets: [KEPLR_WALLET],
        explorerUrl: "https://www.mintscan.io/neutron-testnet/tx/{TRX_HASH}"
    }],
    ["comdex-test3", {
        rpc: "https://test3-rpc.comdex.one",
        supportedWallets: [KEPLR_WALLET],
        explorerUrl: "https://test3-explorer.comdex.one/comdex-test3/tx/{TRX_HASH}"
    }],
    ["theta-testnet-001", {
        rpc: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
        supportedWallets: [KEPLR_WALLET],
        explorerUrl: "https://www.mintscan.io/cosmoshub-testnet/tx/{TRX_HASH}"
    }],
    ["solana_testnet", {
        rpc: "https://api.testnet.solana.com",
        supportedWallets: [PHANTOM_WALLET],
        explorerUrl: "https://explorer.solana.com/tx/{TRX_HASH}?cluster=testnet"
    }],
    ["ethereum-sepolia-testnet", {
        rpc: "https://sepolia.drpc.org",
        supportedWallets: [PHANTOM_WALLET],
        explorerUrl: "https://sepolia.etherscan.io/tx/{TRX_HASH}"
    }],
]);