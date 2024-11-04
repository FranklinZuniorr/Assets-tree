import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CompanyInfos } from '../screens/company-infos';

const RoutesConfig = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/company-infos' element={<CompanyInfos />} />
        </Routes>
    </BrowserRouter>
}

export default RoutesConfig;