
import { useState } from 'react';
import { getFilteredChildren } from '../../helpers';
import { AssetInternal, LocationInternal } from '../../interfaces';
import styles from './styles.module.css';

interface RecursiveElementProps {
    elements: (LocationInternal | AssetInternal)[];
    element: LocationInternal | AssetInternal
}

export const RecursiveElement = ({ elements, element }: RecursiveElementProps) => {
    const [open, setIsOpen] = useState<boolean>(true);
    const all = getFilteredChildren(element, elements);
    return <div className={styles.recursiveElement}>
        <div onClick={() => setIsOpen(!open)}>
            {`${element.name} ${element.elementType}`}
        </div>
        {
            open &&
            <div style={{ marginLeft: '2rem' }}>
                {
                    all.map(element => (
                        <RecursiveElement key={element.id} element={element} elements={all} />
                    ))
                }
            </div>
        }
    </div>
}