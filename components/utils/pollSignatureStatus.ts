import {Connection} from '@solana/web3.js';

const POLLING_INTERVAL = 1000; // one second
const MAX_POLLS = 30;

const pollSignatureStatus = async (
    signature: string,
    connection: Connection
): Promise<void> => {
    let count = 0;

    const interval = setInterval(async () => {
        // Failed to confirm transaction in time
        if (count === MAX_POLLS) {
            clearInterval(interval);
            return Promise.reject(`Transaction: ${signature}. Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`);
        }

        const {value} = await connection.getSignatureStatus(signature);
        const confirmationStatus = value?.confirmationStatus;

        if (confirmationStatus) {
            const hasReachedSufficientCommitment = confirmationStatus === 'confirmed' || confirmationStatus === 'finalized';

            if (hasReachedSufficientCommitment) {
                clearInterval(interval);
                return Promise.resolve();
            }
        }

        count++;
    }, POLLING_INTERVAL);
};

export default pollSignatureStatus;
