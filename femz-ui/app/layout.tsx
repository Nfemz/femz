"use-client";
import "../styles/dist.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-slate-200 min-w-screen min-h-screen place-content-center">
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
