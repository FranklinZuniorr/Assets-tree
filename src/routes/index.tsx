import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PAINEL_PATHS } from '../helpers/painel-paths';

const CompanyInfosLazy = lazy(() => import('../screens/company-infos'));
const CompaniesLazy = lazy(() => import('../screens/companies'));

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                path={PAINEL_PATHS.companyInfo.path} 
                element={
                    <Suspense fallback={null}>
                        <CompanyInfosLazy />
                    </Suspense>
                } 
                />
                <Route 
                path={PAINEL_PATHS.companies.path} 
                element={
                    <Suspense fallback={null}>
                        <CompaniesLazy />
                    </Suspense>
                } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesConfig;