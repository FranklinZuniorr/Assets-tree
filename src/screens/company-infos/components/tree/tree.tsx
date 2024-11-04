import { useReducer } from 'react';
import { getFilteredChildrenStart } from '../../helpers';
import { useAllElements } from '../../hooks/useAllElements';
import { RecursiveElement } from '../recursive-element';
import styles from './styles.module.css';
import { assetReducer, initialState } from '../../helpers/filters-reducer-configs';

interface TreeProps {
    id: string;
}

export const Tree = ({ id }: TreeProps) => {
    const allElements = useAllElements(id);
    const filteredElements = getFilteredChildrenStart(allElements);
    const [state, dispatch] = useReducer(assetReducer, initialState);
    return (
        <div className={styles.tree}>
            <div className={styles.tree_filters}>
                <label>
                    Search
                    <input 
                    type='text' 
                    placeholder='asset/component/location' 
                    value={state.elementName}
                    onChange={({ target: { value }}) => dispatch({ type: 'SET_ELEMENT_NAME', payload: value })}
                    />
                </label>
            </div>
            <div className={styles.tree_content}>
                {
                    filteredElements.map(element => (
                        <RecursiveElement 
                        key={element.id} 
                        element={element} 
                        elements={allElements} 
                        filters={{ 
                            assetSensorType: 'energy', 
                            assetStatus: undefined, 
                            elementName: state.elementName
                        }}/>
                    ))
                }
            </div>
        </div>
    )
}