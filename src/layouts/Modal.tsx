import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-in-out] items-center justify-center bg-black/30 font-inter">
      {children}
    </div>
  );
}
