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
    denomTrace:string;
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
    startNode:  {
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
    endNode:  {
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

export type TransactionType = 'TRANSFER' | 'IBC_TRANSFER' | 'CONTRACT_CALL';
export type InvoiceType = 'invoice' | 'listing';
export type InvoiceDirection = 'INCOMING' | 'OUTGOING' | 'NEUTRAL';
export type InvoiceStatus = 'pending' | 'resolved' | 'rejected';