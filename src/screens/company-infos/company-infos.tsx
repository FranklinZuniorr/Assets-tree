import { useNavigate, useParams } from 'react-router-dom';
import backBtnIcon from '../../assets/images/return.svg';
import styles from './styles.module.css';
import { PAINEL_PATHS } from '../../helpers/painel-paths';
import { Tree } from './components/tree';

export const CompanyInfos = () => {
    const navigate = useNavigate();
    const { companyName = '-', id = '' } = useParams();

    return <div className={styles.companyInfos}>
        <h2>
            <img src={backBtnIcon} alt='back-btn' onClick={() => navigate(PAINEL_PATHS.companies.path)} />
            {companyName}
        </h2>
        <Tree id={id} />
    </div>
}