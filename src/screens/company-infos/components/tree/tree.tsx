import { useReducer, useState } from 'react';
import { getFilteredChildrenStart } from '../../helpers';
import { useAllElements } from '../../hooks/useAllElements';
import { RecursiveElement } from '../recursive-element';
import styles from './styles.module.css';
import { assetReducer, initialState } from '../../helpers/filters-reducer-configs';
import { ENUM_ASSET_SENSOR_TYPE, ENUM_ASSET_STATUS, /* ENUM_ASSET_STATUS */ } from '../../../../constants';

interface TreeProps {
    id: string;
}

export const Tree = ({ id }: TreeProps) => {
    const [filterSensorType, setFilterSensorType] = useState<ENUM_ASSET_SENSOR_TYPE | undefined>(undefined);
    const [filterStatus, setFilterStatus] = useState<ENUM_ASSET_STATUS | undefined>(undefined);
    const allElements = useAllElements(id, filterSensorType, filterStatus);
    const filteredElements = getFilteredChildrenStart(allElements);
    const [state, dispatch] = useReducer(assetReducer, initialState);

    const handleFilterSensorType = () => {
        if (!filterSensorType) {
            setFilterSensorType(ENUM_ASSET_SENSOR_TYPE.ENERGY);
            return;
        }

        setFilterSensorType(undefined);
    };

    const handleFilterStatus = () => {
        if (!filterStatus) {
            setFilterStatus(ENUM_ASSET_STATUS.ALERT);
            return;
        }

        setFilterStatus(undefined);
    };

    return (
        <div className={styles.tree}>
            <div className={styles.tree_filters}>
                <input 
                className={styles.tree_filters_search}
                type='text' 
                placeholder='Search asset/component/location' 
                value={state.elementName}
                onChange={({ target: { value }}) => dispatch({ type: 'SET_ELEMENT_NAME', payload: value })}
                />
                <div className={styles.tree_filters_btns}>
                    <button 
                    className={`${styles.tree_filters_btns_btn} ${filterSensorType ? styles.tree_filters_btns_btn__selected : ''}`}
                    onClick={handleFilterSensorType}
                    >
                        Sensor de energia
                    </button>
                    <button 
                    className={`${styles.tree_filters_btns_btn} ${filterStatus ? styles.tree_filters_btns_btn__selected : ''}`}
                    onClick={handleFilterStatus}
                    >
                        Crítico
                    </button>
                </div>
            </div>
            <div className={styles.tree_content}>
                {
                    filteredElements.map(element => (
                        <RecursiveElement 
                        key={element.id} 
                        element={element} 
                        elements={allElements} 
                        filters={{ 
                            assetSensorType: undefined, 
                            assetStatus: undefined, 
                            elementName: state.elementName
                        }}/>
                    ))
                }
            </div>
        </div>
    )
}