interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-in-out] items-center justify-center bg-black/10 font-inter">
      {children}
    </div>
  );
}
