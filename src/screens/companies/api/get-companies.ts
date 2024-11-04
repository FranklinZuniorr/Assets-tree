import { apiClient } from "../../../config/axios";
import { generateReactQuery } from "../../../helpers/query-generators";

export const KEY_GET_COMPANIES = "KEY_GET_COMPANIES";

interface GetCompanies {
    id: string,
    name: string
}

const getCompanies = async (): Promise<GetCompanies[]> => {
    const path = "/companies";
    try {
        const response: GetCompanies[] = (await apiClient.get(path)).data;
        return response
    } catch (error) {
        throw new Error(`${path}: ${error}`);
    }
}

const useGetCompanies = generateReactQuery<GetCompanies[], void>(KEY_GET_COMPANIES, getCompanies);

export default useGetCompanies;