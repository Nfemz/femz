export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded shadow-md relative bg-slate-50 w-4/5 h-full p-6 place-self-center">
      {children}
    </div>
  );
}
