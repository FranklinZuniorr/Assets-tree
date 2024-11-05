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
import alertIcon from '../../../../assets/images/alert.svg';
import operatingIcon from '../../../../assets/images/operating.svg';
import energyIcon from '../../../../assets/images/energy.svg';

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
    const allFilteredElements = getFilteredChildren(element, elements);
    const isComponent = element.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToAsset || 
    element.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToLocation ||
    element.elementType === ENUM_ELEMENT_TYPE.ComponentUnlinked; 
    const [isTouched, setIsTouched] = useState<boolean>(false);

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
            setIsTouched(false);
        }

        return () => {
            setIsOpenTree(false);
        }
    }, [filters]);

    useEffect(() => {
        if(!setIsOpenTree) {
            return;
        }
        if(isTouched) {
            return
        }
        setIsOpenTree(open);
    }, [open])

    return <div className={styles.recursiveElement}>
        <div 
        className={`${styles.recursiveElement_head} ${isComponent ? styles.recursiveElement_head_component : ''}`} 
        onClick={() => {
            setIsOpen(!open);
            setIsTouched(true);
        }}
        style={{
            cursor: allFilteredElements.length ? 'pointer' : 'default',
        }}
        >
            {
                (element.elementType === ENUM_ELEMENT_TYPE.AssetRoot || 
                element.elementType === ENUM_ELEMENT_TYPE.SubAsset) &&
                <img 
                className={styles.recursiveElement_iconElementType}  
                src={assetIcon} 
                alt='asset' 
                />
            }
            {
                (element.elementType === ENUM_ELEMENT_TYPE.LocationRoot || 
                element.elementType === ENUM_ELEMENT_TYPE.SubLocation) &&
                <img 
                className={styles.recursiveElement_iconElementType} 
                src={locationIcon} 
                alt='location' 
                />
            }
            {
                (element.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToAsset || 
                element.elementType === ENUM_ELEMENT_TYPE.ComponentLinkedToLocation ||
                element.elementType === ENUM_ELEMENT_TYPE.ComponentUnlinked) &&
                <img 
                className={styles.recursiveElement_iconElementType} 
                src={componentIcon} 
                alt='component' 
                />
            }
            <span>{element.name}</span>
            {
                allFilteredElements.length > 0 && 
                <img 
                src={arrowIcon} 
                alt='arrow' 
                style={{ 
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }} 
                />
            }
            {
                isComponent && (element as AssetInternal).status === ENUM_ASSET_STATUS.ALERT &&
                <img 
                className={styles.recursiveElement_iconFeedback} 
                src={alertIcon} 
                alt='alert'
                />
            }
            {
                isComponent && (element as AssetInternal).status === ENUM_ASSET_STATUS.OPERATING &&
                <img 
                className={styles.recursiveElement_iconFeedback} 
                src={operatingIcon} 
                alt='alert'
                />
            }
            {
                isComponent && (element as AssetInternal).sensorType === ENUM_ASSET_SENSOR_TYPE.ENERGY &&
                <img 
                className={styles.recursiveElement_iconFeedback} 
                src={energyIcon} 
                alt='alert'
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
                    allFilteredElements.map(element => (
                        <RecursiveElement 
                        key={element.id} 
                        element={element} 
                        elements={elements} 
                        setIsOpenTree={setIsOpen} 
                        filters={filters}
                        />
                    ))
                }
        </div>
    </div>
}