"use client";
import "../styles/dist.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "../context/authContext";
import Image from "next/image";
import { useState } from "react";
import classNames from "../utils/classNames";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      authorization: localStorage.getItem("user-token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseMenuBarClass =
    "w-8 h-0.5 bg-black transition ease transform duration-300";

  return (
    <html lang="en">
      <body className=" bg-slate-200 min-w-screen min-h-screen place-content-center">
        <AuthProvider>
          <ApolloProvider client={client}>
            <div
              className="space-y-2 m-3 group h-5"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div
                className={classNames({
                  [baseMenuBarClass]: true,
                  "opacity-50 group-hover:opacity-100": !menuOpen,
                  "rotate-45 translate-y-2": menuOpen,
                })}
              ></div>
              <div
                className={classNames({
                  [baseMenuBarClass]: !menuOpen,
                  "opacity-50 group-hover:opacity-100": !menuOpen,
                  "opacity-0": menuOpen,
                })}
              ></div>
              <div
                className={classNames({
                  [baseMenuBarClass]: true,
                  "opacity-50 group-hover:opacity-100": !menuOpen,
                  "-rotate-45 -translate-y-0.5": menuOpen,
                })}
              ></div>
            </div>
            {children}
            {/* <div className="absolute bottom-0 left-0 w-full">
              <div className="bg-slate-50 m-2 p-4 flex rounded-full drop-shadow-md">
                hello
              </div>
            </div> */}
          </ApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
