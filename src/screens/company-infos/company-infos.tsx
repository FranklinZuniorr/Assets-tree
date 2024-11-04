import { useNavigate, useParams } from 'react-router-dom';
import { RecursiveElement } from './components/recursive-element';
import { getFilteredChildrenStart } from './helpers';
import { useAllElements } from './hooks/useAllElements';
import backBtnIcon from '../../assets/images/return.svg';
import styles from './styles.module.css';
import { PAINEL_PATHS } from '../../helpers/painel-paths';

export const CompanyInfos = () => {
    const navigate = useNavigate();
    const { companyName = '-', id = '' } = useParams();
    const allElements = useAllElements(id);
    const filteredElements = getFilteredChildrenStart(allElements);

    return <div className={styles.companyInfos}>
        <h2>
            <img src={backBtnIcon} alt='back-btn' onClick={() => navigate(PAINEL_PATHS.companies.path)} />
            {companyName}
        </h2>
        {
            filteredElements.map(element => (
                <RecursiveElement 
                key={element.id} 
                element={element} 
                elements={allElements} 
                filters={{ 
                    assetSensorType: 'energy', 
                    assetStatus: undefined, 
                    elementName: 'CHARCOAL STORAGE SECTOR' 
                }}/>
            ))
        }
    </div>
}