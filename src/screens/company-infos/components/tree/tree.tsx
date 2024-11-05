import { useReducer } from 'react';
import { getFilteredChildrenStart } from '../../helpers';
import { useAllElements } from '../../hooks/useAllElements';
import { RecursiveElement } from '../recursive-element';
import styles from './styles.module.css';
import { assetReducer, initialState } from '../../helpers/filters-reducer-configs';
import { ENUM_ASSET_SENSOR_TYPE, /* ENUM_ASSET_STATUS */ } from '../../../../constants';

interface TreeProps {
    id: string;
}

export const Tree = ({ id }: TreeProps) => {
    const allElements = useAllElements(id, ENUM_ASSET_SENSOR_TYPE.ENERGY, undefined);
    const filteredElements = getFilteredChildrenStart(allElements);
    const [state, dispatch] = useReducer(assetReducer, initialState);
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