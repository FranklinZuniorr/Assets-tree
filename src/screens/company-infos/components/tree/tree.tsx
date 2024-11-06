import { useReducer } from 'react';
import { getFilteredChildrenStart } from '../../helpers';
import { useAllElements } from '../../hooks/useAllElements';
import { RecursiveElement } from '../recursive-element';
import styles from './styles.module.css';
import { assetReducer, initialState } from '../../helpers/filters-reducer-configs';
import { ENUM_ASSET_SENSOR_TYPE, ENUM_ASSET_STATUS } from '../../../../constants';
import energyIcon from '../../../../assets/images/thunderbolt.svg';
import alertCircle from '../../../../assets/images/alert-circle.svg';
import energyIconWhite from '../../../../assets/images/thunderbolt-white.svg';
import alertCircleWhite from '../../../../assets/images/alert-circle-white.svg';
import { Loading } from '../../../../components/loading';
import { debounce } from '../../../../utils';

interface TreeProps {
    id: string;
}

export const Tree = ({ id }: TreeProps) => {
    const { array: allElements, isLoading, refetch } = useAllElements(id);
    const filteredElements = getFilteredChildrenStart(allElements);
    const [state, dispatch] = useReducer(assetReducer, initialState);

    const handleFilterSensorType = () => {
        if (!state.assetSensorType) {
            dispatch({type: 'SET_ASSET_SENSOR_TYPE', payload: ENUM_ASSET_SENSOR_TYPE.ENERGY});
            refetch();
            return;
        }
        
        dispatch({type: 'SET_ASSET_SENSOR_TYPE', payload: ''});
        refetch();
    };

    const handleFilterStatus = () => {
        if (!state.assetStatus) {
            dispatch({type: 'SET_ASSET_STATUS', payload: ENUM_ASSET_STATUS.ALERT});
            refetch();
            return;
        }

        dispatch({type: 'SET_ASSET_STATUS', payload: ''});
        refetch();
    };

    return (
        <div className={styles.tree}>
            <div className={styles.tree_filters}>
                <input 
                className={styles.tree_filters_search}
                type='text' 
                placeholder='Search asset/component/location' 
                value={state.elementName}
                onChange={({ target: { value }}) => {
                    dispatch({ type: 'SET_ELEMENT_NAME', payload: value });
                    debounce(() => refetch(), 500);
                }}
                />
                <div className={styles.tree_filters_btns}>
                    <button 
                    className={`${styles.tree_filters_btns_btn} ${state.assetSensorType ? styles.tree_filters_btns_btn__selected : ''}`}
                    onClick={handleFilterSensorType}
                    >
                        {
                            state.assetSensorType ?
                            <img src={energyIconWhite} alt='energy' /> :
                            <img src={energyIcon} alt='energy-white' />
                        }
                        Energy sensor
                    </button>
                    <button 
                    className={`${styles.tree_filters_btns_btn} ${state.assetStatus ? styles.tree_filters_btns_btn__selected : ''}`}
                    onClick={handleFilterStatus}
                    >
                        {
                            state.assetStatus ?
                            <img src={alertCircleWhite} alt='energy' /> :
                            <img src={alertCircle} alt='energy' />
                        }
                        Critical alert
                    </button>
                </div>
            </div>
            {
                isLoading ?
                <Loading />:
                <div className={styles.tree_content}>
                    {
                        filteredElements.map(element => (
                            <RecursiveElement 
                            key={element.id} 
                            element={element}
                            elements={allElements} 
                            filters={{ 
                                assetSensorType: state.assetSensorType as ENUM_ASSET_SENSOR_TYPE, 
                                assetStatus: state.assetStatus as ENUM_ASSET_STATUS, 
                                elementName: state.elementName
                            }}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}