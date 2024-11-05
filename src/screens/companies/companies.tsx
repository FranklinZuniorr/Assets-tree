import { useNavigate } from 'react-router-dom';
import useGetCompanies from './api/get-companies';
import styles from './styles.module.css';
import { PAINEL_PATHS } from '../../helpers/painel-paths';
import { CardCompany } from './components/card-company';

export const Companies = () => {
    const navigate = useNavigate();
    const { data: companies } = useGetCompanies();

    return (
        <div className={styles.companies}>
            <h2>All available companies</h2>
            <div className={styles.companies_content}>
                <p>Here you find all assets, components and locations of some company</p>
                <div className={styles.companies_content_renderArea}>
                    {
                        companies?.map(company => (
                            <CardCompany 
                            key={company.id} 
                            companyName={company.name} 
                            onClick={() => navigate(PAINEL_PATHS.companyInfo.fnPath(company.id, company.name))} 
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}