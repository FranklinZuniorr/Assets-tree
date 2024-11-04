import styles from './styles.module.css';
import companyIcon from '../../../../assets/images/company.svg';

interface CardCompanyProps {
    companyName: string;
    onClick: () => void;
}

export const CardCompany = ({ companyName, onClick }: CardCompanyProps) => {
    return <div className={styles.cardCompany} onClick={onClick}>
        <img src={companyIcon} alt={companyName} />
        <span>{companyName}</span>
    </div>
}