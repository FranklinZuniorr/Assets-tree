import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CompanyInfos } from '../screens/company-infos';
import { PAINEL_PATHS } from '../helpers/painel-paths';

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PAINEL_PATHS.companyInfo.path} element={<CompanyInfos />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesConfig;