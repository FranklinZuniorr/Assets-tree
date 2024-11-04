import { getFilteredChildrenStart } from '../../helpers';
import { useAllElements } from '../../hooks/useAllElements';
import { RecursiveElement } from '../recursive-element';
import styles from './styles.module.css';

interface TreeProps {
    id: string;
}

export const Tree = ({ id }: TreeProps) => {
    const allElements = useAllElements(id);
    const filteredElements = getFilteredChildrenStart(allElements);
    return <div className={styles.tree}>
        {
            filteredElements.map(element => (
                <RecursiveElement 
                key={element.id} 
                element={element} 
                elements={allElements} 
                filters={{ 
                    assetSensorType: 'energy', 
                    assetStatus: undefined, 
                    elementName: 'CHARCOAL STORAGE SECTOR' 
                }}/>
            ))
        }
    </div>
}