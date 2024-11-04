import { ENUM_ASSET_STATUS } from "../constants"

export interface LocationExternal {
    id: string,
    name: string,
    parentId: null | string
}

export interface AssetExternal {
    id: string,
    name: string,
    parentId: null | string,
    sensorId: string,
    sensorType: string,
    status: ENUM_ASSET_STATUS,
    gatewayId: string,
    locationId: null | string
}