import {PublicKey, Transaction, VersionedTransaction, SendOptions} from '@solana/web3.js';

export interface Category {
    product: {
        title: string;
        identity: number;
        imageUrl: string;
    };
    category: {
        name: string;
    };
}

export interface Invoices {
    title: string,
    identity: number,
    imageUrl: string;
}

export interface SearchModalProps {
    searchToggle: boolean;
    setSearchToggle: (newSearchToggle: boolean) => void;
}

export interface Invoice {
    identity: number;
    title: string;
    description: string;
    imageUrl: string;
    requestedAmount: number;
    payedAmount: number;
    status: InvoiceStatus;
    creationDate: string;
    dueDate: string;
    type: InvoiceType;
    direction: InvoiceDirection;

    receiver: {
        identity: number;
        address: string;
        relatedZone: {
            identity: number;
            logoUrl: string;
            networkId: string;
            name: string;
        };
    };

    requester: {
        identity: number;
        address: string;
    };

    payerEmail: {
        identity: number;
        address: string;
    };

    payerWallet: {
        identity: number;
        address: string;
    };

    requestedAsset: Asset;
    payedAsset: Asset;
}

export interface Asset {
    identity: number;
    ticker: string;
    logoUrl: string;
    denom: string;
    denomTrace: string;
    originalTicker: string;
    localTicker: string;
    locatedZone: {
        identity: number;
        logoUrl: string;
        networkId: string;
        name: string;
    }
}

export interface PathFinderResponse {
    transactionType: TransactionType;
    pathResults: PathResult[],
    ibcMemo: string;
    txMemo: string;
    address: string;
    feeToken: string;
    feeAmount: number;
    destinationTokenAmount: number;
}

export interface PathResult {
    startNode: {
        properties: {
            ticker: string
            localTicker: string,
            logoUrl: string,
        },
        zone: {
            name: string;
            logoUrl: string,
        },
    },
    edge: {
        type: string,
        properties: {
            inputChannel: string,
            outputChannel: string,
        }
    },
    endNode: {
        properties: {
            ticker: string
            localTicker: string,
            logoUrl: string,
        },
        zone: {
            name: string;
            logoUrl: string,
        },
        edge: {
            type: string,
            properties: {
                inputChannel: string,
                outputChannel: string,
            }
        }
    },
    edgeCost: number,
}

export type TransactionType = 'TRANSFER' | 'IBC_TRANSFER' | 'CONTRACT_CALL' | 'DIRECT_PAYMENT';
export type InvoiceType = 'invoice' | 'listing';
export type InvoiceDirection = 'INCOMING' | 'OUTGOING' | 'NEUTRAL';
export type InvoiceStatus = 'pending' | 'resolved' | 'rejected';

export interface Category {
    identity: number;
    name: string;
    imageUrl: string;
    featured: boolean;
}

export interface Product {
    identity: number;
    title: string;
    description: string;
    imageUrl: string;
    requestedAmount: number;
    creationDate: string;
    dueDate: string;
    receiver: {
        identity: number;
        address: string;
        relatedZone: {
            identity: number;
            logoUrl: string;
            networkId: string;
            name: string;
        };
    };
    requester: {
        identity: number;
        address: string;
    };
    requestedAsset: Asset;
}

type DisplayEncoding = 'utf8' | 'hex';

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

type PhantomRequestMethod =
    | 'connect'
    | 'disconnect'
    | 'signAndSendTransaction'
    | 'signAndSendTransactionV0'
    | 'signAndSendTransactionV0WithLookupTable'
    | 'signTransaction'
    | 'signAllTransactions'
    | 'signMessage';

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

export interface PhantomProvider {
    publicKey: PublicKey;
    isConnected: boolean;
    signAndSendTransaction: (
        transaction: Transaction | VersionedTransaction,
        opts?: SendOptions
    ) => Promise<{ signature: string; publicKey: PublicKey }>;
    signTransaction: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>;
    signAllTransactions: (
        transactions: (Transaction | VersionedTransaction)[]
    ) => Promise<(Transaction | VersionedTransaction)[]>;
    signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<any>;
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, handler: (args: any) => void) => void;
    request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}