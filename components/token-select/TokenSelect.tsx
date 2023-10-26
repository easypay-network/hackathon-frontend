import React, {useState, useRef, useEffect, FC} from 'react';
import styles from "./TokenSelect.module.css";
import {Asset} from "../types";
import dropdownArrow from "../../public/dropdown-arrow.svg"
import TokenPanel from "./token-panel/TokenPanel";

interface Props {
    assets: Asset[];
    label:string;
    disabledInput?: boolean;
    amount: string;
    onDataUpdate: (childToken: Asset | undefined, childAmount: string) => void;
}

const TokenSelect:FC<Props> = ({assets, label, disabledInput, amount, onDataUpdate}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);


    const [isListVisible, setIsListVisible] = useState<boolean>(false)
    const [selectedToken, setSelectedToken] = useState<Asset | undefined>(undefined);

    const handleTokenChange = (selectedToken :Asset | undefined) => {
        onDataUpdate(selectedToken, amount);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newAmount = event.target.value;
            onDataUpdate(selectedToken, newAmount);
    };

    const getTokenByDenom = (denom:string) => {
        const changedToken = assets.filter(token => token.denom === denom)[0]
        setSelectedToken(changedToken)
        setIsListVisible(false)
        handleTokenChange(changedToken)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsListVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={styles.mainContainer}>
            <div className={styles.tokenSelectTittle}>{label}</div>
            <div ref={containerRef} className={styles.selectorContainer}>
                <span className={styles.inputLabel}>Token</span>
                <div className={styles.select} onClick={() => setIsListVisible(!isListVisible)}>
                        {!selectedToken ?
                            <div className={styles.startInput}>
                                <span>Choose a token</span>
                                <img alt={""} src={dropdownArrow.src}/>
                            </div>
                            :
                            <>
                               <TokenPanel token={selectedToken}/>
                            </>
                        }
                </div>
                {isListVisible &&
                <div className={styles.tokensList}>
                    {assets?.map(token =>
                            <div className={styles.tokenListItem} key={token.denom} onClick={() => getTokenByDenom(token.denom)}>
                                <TokenPanel token={token}/>
                            </div>
                        )
                    }
                </div>
                }
            </div>
            <div className={styles.amountContainer}>
                <span className={styles.inputLabel}>Amount</span>
                <input type={"number"}
                       disabled={disabledInput}
                       className={styles.amount}
                       value={amount}
                       onChange={handleAmountChange}
                />
            </div>
        </div>
    );
};

export default TokenSelect;