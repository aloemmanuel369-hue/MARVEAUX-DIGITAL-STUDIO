import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-700 rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-50">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-600">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
        {actions && <div className="p-6 pt-0 flex gap-3 justify-end">{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;