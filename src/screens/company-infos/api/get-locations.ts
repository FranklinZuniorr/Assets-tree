import { apiClient } from "../../../config/axios";
import { generateReactQuery } from "../../../helpers/query-generators";
import { LocationExternal } from "../../../interfaces";

export const KEY_GET_LOCATIONS = 'KEY_GET_LOCATIONS';

const getLocations = async (companyId: string): Promise<LocationExternal[]> => {
    const path: string = `/companies/${companyId}/locations`;
    try {
        const response: LocationExternal[] = (await apiClient.get(path)).data;
        return response;
    } catch (error) {
        throw new Error(`${path}: ${error}`);
    }
}

const useGetLocations = generateReactQuery<LocationExternal[], string>(KEY_GET_LOCATIONS, getLocations);

export default useGetLocations;