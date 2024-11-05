import { useMemo } from 'react';
import { AssetExternal, LocationExternal } from '../../../interfaces';
import { ENUM_ELEMENT_TYPE } from '../constants';
import { AssetInternal, LocationInternal } from '../interfaces';
import useGetLocations from '../api/get-locations';
import { useGetAssets } from '../api/get-assets';
import { ENUM_ASSET_SENSOR_TYPE, ENUM_ASSET_STATUS } from '../../../constants';

const determineElementType = (element: LocationExternal | AssetExternal): ENUM_ELEMENT_TYPE => {
    if ('name' in element && 'id' in element && 'locationId' in element) {
        const asset = element as AssetExternal;

        if(asset.sensorType && !asset.sensorId || !asset.parentId) {
            return ENUM_ELEMENT_TYPE.ComponentUnlinked
        }

        if(asset.locationId && !asset.sensorId) {
            return ENUM_ELEMENT_TYPE.AssetRoot
        }

        if(asset.parentId && !asset.sensorId) {
            return ENUM_ELEMENT_TYPE.SubAsset
        }

        if(asset.sensorType && asset.locationId) {
            return ENUM_ELEMENT_TYPE.ComponentLinkedToLocation
        }

        if(asset.sensorType && asset.parentId) {
            return ENUM_ELEMENT_TYPE.ComponentLinkedToAsset
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

export const useAllElements = (companyId: string, sensorType?: ENUM_ASSET_SENSOR_TYPE, status?: ENUM_ASSET_STATUS): (LocationInternal | AssetInternal)[] => {
    const { data: locations } = useGetLocations(companyId);
    const { data: assets } = useGetAssets(companyId);

    return useMemo(() => {
        if (locations && assets) {
            const transformedLocations: LocationInternal[] = locations
                .map((location) => ({
                    ...location,
                    elementType: determineElementType(location)
                }));

            let transformedAssets: AssetInternal[] = assets
                .map((asset) => ({
                    ...asset,
                    elementType: determineElementType(asset)
                }));

            if(status) {
                transformedAssets = transformedAssets.filter(asset => (asset as AssetInternal).status === status);
            }

            if (sensorType) {
                transformedAssets = transformedAssets.filter(asset => (asset as AssetInternal).sensorType === sensorType);
            }

            const allElements = [...transformedLocations, ...transformedAssets];

            return allElements;
        }

        return [];
    }, [locations, assets]);
};
