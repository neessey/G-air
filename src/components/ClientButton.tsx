'use client';

type Props = {
  children: React.ReactNode;
};

export default function ClientButton({ children }: Props) {
  return (
    <button onClick={() => console.log('click')}>
      {children}
    </button>
  );
}
