import { RecursiveElement } from './components/recursive-element';
import { getFilteredChildrenStart } from './helpers';
import { useAllElements } from './hooks/useAllElements';
import styles from './styles.module.css';

export const CompanyInfos = () => {

    const allElements = useAllElements("662fd0ee639069143a8fc387");

    const filteredElements = getFilteredChildrenStart(allElements);

    return <div className={styles.companyInfos}>
        Company Infos
        <br />
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