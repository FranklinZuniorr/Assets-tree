import styles from './styles.module.css';
import logo from '../../../assets/images/logo.png';

export const TopHeader = () => {
    return <div className={styles.topHeader}>
        <img src={logo} alt='logo' />
        <span>Assets tree 🧢</span>
    </div>
}