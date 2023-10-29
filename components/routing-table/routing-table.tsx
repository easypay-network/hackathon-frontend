import React, {FunctionComponent} from 'react';
import styles from './routing-table.module.css'
import {Invoice, PathResult} from '../types'

interface PathResultsProps {
    pathResults:PathResult[];
    invoice?: Invoice | undefined;
}

const RoutingTable:FunctionComponent<PathResultsProps> = ({pathResults, invoice}) => {
    const transformAction = (pathType: string) => {
       switch (pathType) {
           case 'ibcTransfer':return 'IBC Transfer';
           case 'directPayment': return 'Direct payment';
           default: return pathType;
       }
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.th}>step</th>
                    <th className={styles.th}>start</th>
                    <th className={styles.th}>action</th>
                    <th className={styles.th}>end</th>
                    <th>fee</th>
                </tr>
                </thead>
                <tbody>
                {pathResults.map((path, index) => (
                    <tr key={index} className={styles.transactionTr}>
                        <td className={styles.td}>#{index + 1}</td>
                        <td className={styles.assetCell}>
                            {path.edge.type === "directPayment"
                                ?
                                <>
                                    <span>
                                        <img alt={''} width={'20'} height={'20'} src={invoice?.requestedAsset.logoUrl}/>
                                        {path.startNode.properties.ticker === 'NULL' ? path.startNode.properties.localTicker.toUpperCase() : path.startNode.properties.ticker.toUpperCase()}
                                    </span>
                                    &nbsp;on&nbsp;
                                    <span>
                                    <img alt={''} width={'20'} height={'20'} src={invoice?.requestedAsset?.locatedZone?.logoUrl}/>
                                        {invoice?.requestedAsset.locatedZone.name.toUpperCase()}
                                     </span>
                                </>
                                :
                                <>
                                <span>
                                    <img alt={''} width={'20'} height={'20'} src={path.startNode.properties.logoUrl}/>
                                    {path.startNode.properties.ticker === 'NULL' ? path.startNode.properties.localTicker.toUpperCase() : path.startNode.properties.ticker.toUpperCase()}
                                    </span>
                                    &nbsp;on&nbsp;
                                    <span>
                                    <img alt={''} width={'20'} height={'20'} src={path.startNode.zone?.logoUrl}/>
                                    {path.startNode.zone?.name.toUpperCase()}
                                     </span>
                                </>
                            }
                        </td>
                        <td className={styles.td}>
                            {
                                path.edge.type === 'ibcTransfer' &&
                                path.edge.properties.inputChannel === 'NULL' &&
                                path.edge.properties.outputChannel === 'NULL' ? <p>Bridge Transfer</p> :
                                    <>
                                        <p>{transformAction(path.edge.type)}</p>
                                        {path.edge.type === 'ibcTransfer' &&
                                        <>
                                            <p>Input channel: {path.edge.properties.inputChannel}</p>
                                            <p>Output channel: {path.edge.properties.outputChannel}</p>
                                        </>}
                                    </>
                            }
                        </td>
                        <td className={styles.assetCell}>
                            {path.edge.type === "directPayment"
                                ?
                                <>
                                    <span>
                                        <img alt={''} width={'20'} height={'20'} src={invoice?.requestedAsset.logoUrl}/>
                                        {path.startNode.properties.ticker === 'NULL' ? path.startNode.properties.localTicker.toUpperCase() : path.startNode.properties.ticker.toUpperCase()}
                                    </span>
                                    &nbsp;on&nbsp;
                                    <span>
                                    <img alt={''} width={'20'} height={'20'} src={invoice?.requestedAsset.locatedZone?.logoUrl}/>
                                        {invoice?.requestedAsset.locatedZone.name.toUpperCase()}
                                     </span>
                                </>
                                :
                                <>
                                     <span>
                                        <img alt={''} width={'20'} height={'20'} src={path.endNode.properties.logoUrl}/>
                                         {path.endNode.properties.ticker ==='NULL' ? path.endNode.properties.localTicker.toUpperCase() : path.endNode.properties.ticker.toUpperCase()}
                                     </span>
                                    &nbsp;on&nbsp;
                                    <span>
                                        <img alt={''} width={'20'} height={'20'} src={path.endNode.zone?.logoUrl}/>
                                        {path.endNode.zone?.name.toUpperCase()}
                                    </span>
                                </>
                            }

                        </td>
                        <td>{path.edgeCost}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoutingTable;