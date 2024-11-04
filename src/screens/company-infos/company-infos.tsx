
import { ENUM_ELEMENT_TYPE } from './constants';
import getFilteredChildren from './helpers';
import { useAllElements } from './hooks/useAllElements';
import styles from './styles.module.css';

export const CompanyInfos = () => {

    const all = useAllElements("662fd0fab3fd5656edb39af5");
    console.log(all)

    const field = {
        "id": "6a9b47f2cac55c0062464076",
        "name": "Evaporator",
        "parentId": null,
        "elementType": ENUM_ELEMENT_TYPE.LocationRoot
    }
    console.warn(getFilteredChildren(field, all));

    return <div className={styles.companyInfos}>Company Infos</div>
}