import { useEffect, useState } from 'react';
import { getFilteredChildren } from '../../helpers';
import { AssetInternal, LocationInternal } from '../../interfaces';
import styles from './styles.module.css';
import { ENUM_ASSET_SENSOR_TYPE, ENUM_ASSET_STATUS } from '../../../../constants';
import arrowIcon from '../../../../assets/images/right-arrow-svgrepo-com.svg';
import assetIcon from '../../../../assets/images/asset.png';
import componentIcon from '../../../../assets/images/component.png';
import locationIcon from '../../../../assets/images/location.png';
import { ENUM_ELEMENT_TYPE } from '../../constants';

interface Filters {
    assetSensorType?: ENUM_ASSET_SENSOR_TYPE;
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

        if(!filters.assetSensorType && !filters.assetStatus && !filters.elementName) {
            setIsOpenTree(false);
            return;
        }

        const validation1 = !!((filters.elementName && element.name.toLowerCase().includes(filters.elementName.toLowerCase())) && 
        (filters.assetStatus && (element as AssetInternal).status === filters.assetStatus) &&
        (filters.assetSensorType && (element as AssetInternal).sensorType === filters.assetSensorType));

        const validation2 = !!((filters.elementName && element.name.toLowerCase().includes(filters.elementName.toLowerCase())) && 
        (filters.assetStatus && (element as AssetInternal).status === filters.assetStatus));

        const validation3 = !!((filters.elementName && element.name.toLowerCase().includes(filters.elementName.toLowerCase())) && 
        (filters.assetSensorType && (element as AssetInternal).sensorType === filters.assetSensorType));

        const validation4 = !!((filters.elementName && element.name.toLowerCase().includes(filters.elementName.toLowerCase())) ||
        (filters.assetStatus && (element as AssetInternal).status === filters.assetStatus) ||
        (filters.assetSensorType && (element as AssetInternal).sensorType === filters.assetSensorType));

        if(
            validation1 ||
            validation2 ||
            validation3 ||
            validation4
        ) {
            setIsOpenTree(true);
        }

        return () => {
            setIsOpenTree(false);
        }
    }, [filters]);

    return <div className={styles.recursiveElement}>
        <div 
        className={styles.recursiveElement_head} 
        onClick={() => setIsOpen(!open)}
        style={{
            cursor: allElements.length ? 'pointer' : 'default'
        }}
        >
            {
                (element.elementType === ENUM_ELEMENT_TYPE.AssetRoot || 
                element.elementType === ENUM_ELEMENT_TYPE.SubAsset) &&
                <img 
                className={styles.recursiveElement_iconElementType}  
                src={assetIcon} 
                alt='arrow' 
                style={{ 
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }} 
                />
            }
            {
                (element.elementType === ENUM_ELEMENT_TYPE.LocationRoot || 
                element.elementType === ENUM_ELEMENT_TYPE.SubLocation) &&
                <img 
                className={styles.recursiveElement_iconElementType} 
                src={locationIcon} 
                alt='arrow' 
                style={{ 
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }} 
                />
            }
            {
                (element.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToAsset || 
                element.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToLocation ||
                element.elementType === ENUM_ELEMENT_TYPE.ComponentUnlinked) &&
                <img 
                className={styles.recursiveElement_iconElementType} 
                src={componentIcon} 
                alt='arrow' 
                style={{ 
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }} 
                />
            }
            <span>{element.name}</span>
            {
                allElements.length > 0 && 
                <img 
                src={arrowIcon} 
                alt='arrow' 
                style={{ 
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }} 
                />
            }
        </div>
        <div 
        className={`
        ${styles.recursiveElement_childrens} 
        ${open ? '' : styles.recursiveElement_childrens__hide}
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