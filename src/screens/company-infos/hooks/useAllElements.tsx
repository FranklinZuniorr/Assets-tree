import { useMemo } from 'react';
import { AssetExternal, LocationExternal } from '../../../interfaces';
import { ENUM_ELEMENT_TYPE } from '../constants';
import { AssetInternal, LocationInternal } from '../interfaces';
import useGetLocations from '../api/get-locations';
import { useGetAssets } from '../api/get-assets';

const isValidLocation = (element: LocationExternal): element is LocationExternal => {
    return element && typeof element.id === 'string' && typeof element.name === 'string' && 
           (element.parentId === null || typeof element.parentId === 'string');
};

const isValidAsset = (element: AssetExternal): element is AssetExternal => {
    return element && typeof element.id === 'string' && typeof element.name === 'string' &&
           (element.parentId === null || typeof element.parentId === 'string') &&
           (element.locationId === null || typeof element.locationId === 'string') &&
           (element.sensorId === null || typeof element.sensorId === 'string') &&
           (element.sensorType === undefined || typeof element.sensorType === 'string') &&
           (element.status === undefined || typeof element.status === 'string') &&
           (element.gatewayId === undefined || typeof element.gatewayId === 'string');
};

const determineElementType = (element: LocationExternal | AssetExternal): ENUM_ELEMENT_TYPE => {
    if ('sensorType' in element) {
        const asset = element as AssetExternal;

        if (!asset.parentId && !asset.locationId) {
            return ENUM_ELEMENT_TYPE.ComponentUnlinked;
        }

        if (asset.parentId && asset.sensorType) {
            return ENUM_ELEMENT_TYPE.ComponentLinkedToAsset;
        }

        if (asset.locationId && asset.sensorType) {
            return ENUM_ELEMENT_TYPE.ComponentLinkedToLocation;
        }

        if (asset.parentId && !asset.sensorType) {
            return ENUM_ELEMENT_TYPE.SubAsset;
        }

        if (asset.locationId && !asset.sensorType) {
            return ENUM_ELEMENT_TYPE.AssetRoot;
        }
    } else {
        const location = element as LocationExternal;

        if (location.parentId) {
            return ENUM_ELEMENT_TYPE.SubLocation;
        }

        return ENUM_ELEMENT_TYPE.LocationRoot;
    }

    throw new Error('Elemento inválido ou não identificado');
};

export const useAllElements = (companyId: string): (LocationInternal | AssetInternal)[] => {
    const { data: locations } = useGetLocations(companyId);
    const { data: assets } = useGetAssets(companyId);

    return useMemo(() => {
        if (locations && assets) {
            const transformedLocations: LocationInternal[] = locations
                .filter(isValidLocation)
                .map((location) => ({
                    ...location,
                    elementType: determineElementType(location)
                }));

            const transformedAssets: AssetInternal[] = assets
                .filter(isValidAsset)
                .map((asset) => ({
                    ...asset,
                    elementType: determineElementType(asset)
                }));

            return [...transformedLocations, ...transformedAssets];
        }

        return [];
    }, [locations, assets]);
};
