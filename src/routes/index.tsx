import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CompanyInfos } from '../screens/company-infos';
import { PAINEL_PATHS } from '../helpers/painel-paths';
import { Companies } from '../screens/companies';

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PAINEL_PATHS.companyInfo.path} element={<CompanyInfos />} />
                <Route path={PAINEL_PATHS.companies.path} element={<Companies />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesConfig;