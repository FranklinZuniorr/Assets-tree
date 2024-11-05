import { ReactNode, useEffect } from 'react';
import styles from './styles.module.css';

interface ModalProps {
    open: boolean;
    onClose?: () => void;
    className?: string;
    children: ReactNode;
}

export const Modal = ({ className, children, open = true, onClose }: ModalProps) => {

    const handleBodyOverflow = () => {
        const totalOpenModals = document.getElementsByClassName(styles.modal);

        if(totalOpenModals.length > 0) {
            document.body.style.overflow = 'hidden';
            return;
        }

        document.body.style.overflow = 'auto';
    }

    const handleCloseModal = () => {
        if(!onClose) {
            return;
        } 

        onClose();
    }

    useEffect(() => {
        handleBodyOverflow();
        return () => handleBodyOverflow();
    }, [open])

    return (
        <>
            {
                open && 
                <div 
                className={`${styles.modal} ${className ?? ''}`}
                onClick={handleCloseModal}
                >
                    {children}
                </div>
            }
        </>
    )
}