import useGetCompanies from '../company-infos/api/get-companies';
import { CardCompany } from './card-company';
import styles from './styles.module.css';

export const Companies = () => {

    const { data: companies } = useGetCompanies();

    return (
        <div className={styles.companies}>
            <h2>All available companies</h2>
            <div className={styles.companies_content}>
                {
                    companies?.map(company => (
                        <CardCompany 
                        key={company.id} 
                        companyName={company.name} 
                        onClick={() => null} 
                        />
                    ))
                }
            </div>
        </div>
    )
}