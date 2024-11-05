import { useMemo } from 'react';
import { AssetExternal, LocationExternal } from '../../../interfaces';
import { ENUM_ELEMENT_TYPE } from '../constants';
import { AssetInternal, LocationInternal } from '../interfaces';
import useGetLocations from '../api/get-locations';
import { useGetAssets } from '../api/get-assets';

const determineElementType = (element: LocationExternal | AssetExternal): ENUM_ELEMENT_TYPE => {
    if ('locationId' in element) {
        const asset = element as AssetExternal;

        if (!asset.locationId && !asset.parentId && asset.sensorType) {
            return ENUM_ELEMENT_TYPE.ComponentUnlinked;
        }

        if (asset.locationId && !asset.parentId && !asset.sensorType) {
            return ENUM_ELEMENT_TYPE.AssetRoot;
        }

        if (asset.parentId && !asset.locationId && !asset.sensorType) {
            return ENUM_ELEMENT_TYPE.SubAsset;
        }

        if (asset.locationId && asset.sensorType) {
            return ENUM_ELEMENT_TYPE.ComponentLinkedToAsset;
        }

        if (asset.parentId && asset.sensorType) {
            return ENUM_ELEMENT_TYPE.ComponentLinkedToAsset;
        }
    } else {
        const location = element as LocationExternal;

        if (location.parentId) {
            return ENUM_ELEMENT_TYPE.SubLocation;
        }

        return ENUM_ELEMENT_TYPE.LocationRoot;
    }

    return ENUM_ELEMENT_TYPE.none;
};


export const useAllElements = (companyId: string): {array: (LocationInternal | AssetInternal)[], isLoading: boolean}  => {
    const { data: locations, isFetching: isFetchingLocation } = useGetLocations(companyId);
    const { data: assets, isFetching: isFetchingAssets } = useGetAssets(companyId);

    return {
        array: useMemo(() => {
            if (locations && assets) {
                const transformedLocations: LocationInternal[] = locations
                    .map((location) => ({
                        ...location,
                        elementType: determineElementType(location)
                    }));
    
                const transformedAssets: AssetInternal[] = assets
                    .map((asset) => ({
                        ...asset,
                        elementType: determineElementType(asset)
                    }));
    
                const allElements = [...transformedLocations, ...transformedAssets];
    
                return allElements;
            }
    
            return [];
        }, [locations, assets]),
        isLoading: isFetchingAssets || isFetchingLocation
    };
};
