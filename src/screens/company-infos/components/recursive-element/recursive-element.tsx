import { useEffect, useState } from 'react';
import { getFilteredChildren } from '../../helpers';
import { AssetInternal, LocationInternal } from '../../interfaces';
import styles from './styles.module.css';
import { ENUM_ASSET_STATUS } from '../../../../constants';

interface Filters {
    assetSensorType?: string;
    assetStatus?: ENUM_ASSET_STATUS;
    elementName?: string;
}

interface RecursiveElementProps {
    elements: (LocationInternal | AssetInternal)[];
    element: LocationInternal | AssetInternal;
    setIsOpenTree?: (value: boolean) => void;
    filters: Filters;
}

export const RecursiveElement = ({ elements, element, setIsOpenTree, filters }: RecursiveElementProps) => {
    const [open, setIsOpen] = useState<boolean>(false);
    const allElements = getFilteredChildren(element, elements);

    useEffect(() => {
        if(!setIsOpenTree) {
            return;
        }

        setIsOpen(false);

        if(
            (filters.elementName && element.name.toLowerCase().includes(filters.elementName.toLowerCase())) || 
            (filters.assetStatus && (element as AssetInternal).status === filters.assetStatus) ||
            (filters.assetSensorType && (element as AssetInternal).sensorType === filters.assetSensorType)
        ) {
            setIsOpenTree(true);
        }
    }, [filters]);

    return <div className={styles.recursiveElement}>
        <div onClick={() => setIsOpen(!open)}>
            {`${element.name} ${element.elementType}`}
        </div>
        <div 
        className={`
        ${styles.recursiveElement_childrens} 
        ${open ? '' : styles.recursiveElement_childrens_hide}
        `}
        >
                {
                    allElements.map(element => (
                        <RecursiveElement 
                        key={element.id} 
                        element={element} 
                        elements={allElements} 
                        setIsOpenTree={setIsOpen} 
                        filters={filters}
                        />
                    ))
                }
        </div>
    </div>
}