import ReactJson from 'react-json-view';
import { AssetInternal } from '../../interfaces';
import styles from './styles.module.css';

interface ContentModalRecursiveElementProps {
    data: AssetInternal;
    onClickBtnClose: () => void;
}

export const ContentModalRecursiveElement = ({ data, onClickBtnClose }: ContentModalRecursiveElementProps) => {
    return (
        <div className={styles.contentModalRecursiveElement} onClick={ev => ev.stopPropagation()}>
            <div className={styles.contentModalRecursiveElement_infos}>
                <h1>Component information:</h1>
                <h3>Name: {data.name}</h3>
                <h3>Id: {data.id}</h3>
                <h3>Gateway: {data.gatewayId}</h3>
                <h3>Sensor: {data.sensorType}</h3>
            </div>
            <ReactJson src={data} />
            <button onClick={onClickBtnClose}>Close</button>
        </div>
    )
}