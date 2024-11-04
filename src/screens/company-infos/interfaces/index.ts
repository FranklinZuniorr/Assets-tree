import { ENUM_ASSET_STATUS } from "../../../constants"
import { ENUM_ELEMENT_TYPE } from "../constants"

export interface LocationInternal {
    id: string,
    name: string,
    parentId: null | string,
    elementType: ENUM_ELEMENT_TYPE
}

export interface AssetInternal {
    id: string,
    name: string,
    parentId: null | string,
    sensorId: string,
    sensorType: string,
    status: ENUM_ASSET_STATUS,
    gatewayId: string,
    locationId: null | string,
    elementType: ENUM_ELEMENT_TYPE
}