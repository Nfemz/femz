import "../styles/dist.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-slate-200 min-w-screen min-h-screen place-content-center">
        {children}
      </body>
    </html>
  );
}
