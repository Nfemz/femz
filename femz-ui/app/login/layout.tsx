export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative bg-slate-200 min-w-screen min-h-screen place-content-center">
      {children}
    </div>
  );
}
