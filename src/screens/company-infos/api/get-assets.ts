import { apiClient } from "../../../config/axios";
import { generateReactQuery } from "../../../helpers/query-generators";
import { AssetExternal } from "../../../interfaces";

export const KEY_GET_ASSETS = 'KEY_GET_ASSETS';

export const getAssets = async (companyId: string): Promise<AssetExternal[]> => {
    const path: string = `/companies/${companyId}/assets`;

    try {
        const response: AssetExternal[] = (await apiClient.get(path)).data;
        return response;
    } catch (error) {
        throw new Error(`${path}: ${error}`);
    }
}

export const useGetAssets = generateReactQuery<AssetExternal[], string>(KEY_GET_ASSETS, getAssets);