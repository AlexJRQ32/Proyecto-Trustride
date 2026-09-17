import { useEffect, useRef } from 'react';
import { Icon } from '../Icon/Icon';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) { dialog.showModal(); } else { dialog.close(); }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}><Icon name="x" size={20} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </dialog>
  );
}
