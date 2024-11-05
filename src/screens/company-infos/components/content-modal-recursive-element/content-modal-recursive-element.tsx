import ReactJson from 'react-json-view';
import { AssetInternal } from '../../interfaces';
import styles from './styles.module.css';
import { ENUM_ELEMENT_TYPE } from '../../constants';
import alertIcon from '../../../../assets/images/alert.svg';
import operatingIcon from '../../../../assets/images/operating.svg';
import energyIcon from '../../../../assets/images/energy.svg';
import { ENUM_ASSET_SENSOR_TYPE, ENUM_ASSET_STATUS } from '../../../../constants';

interface ContentModalRecursiveElementProps {
    data: AssetInternal;
    onClickBtnClose: () => void;
}

export const ContentModalRecursiveElement = ({ data, onClickBtnClose }: ContentModalRecursiveElementProps) => {
    const isComponent = data.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToAsset || 
    data.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToLocation ||
    data.elementType === ENUM_ELEMENT_TYPE.ComponentUnlinked;
    return (
        <div className={styles.contentModalRecursiveElement} onClick={ev => ev.stopPropagation()}>
            <div className={styles.contentModalRecursiveElement_infos}>
                <h1>
                    Component information:
                    <span>
                        {
                            isComponent && (data as AssetInternal).status === ENUM_ASSET_STATUS.ALERT &&
                            <img 
                            src={alertIcon} 
                            alt='alert'
                            />
                        }
                        {
                            isComponent && (data as AssetInternal).status === ENUM_ASSET_STATUS.OPERATING &&
                            <img 
                            src={operatingIcon} 
                            alt='alert'
                            />
                        }
                        {
                            isComponent && (data as AssetInternal).sensorType === ENUM_ASSET_SENSOR_TYPE.ENERGY &&
                            <img 
                            src={energyIcon} 
                            alt='alert'
                            />
                        }
                    </span>
                </h1>
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