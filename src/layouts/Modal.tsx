interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-in-out] items-center justify-center bg-white/30 backdrop-blur-[1px]">
      {children}
    </div>
  );
}
