import type { AppProps } from "next/app";
import { createGlobalStyle } from 'styled-components'
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #fff;
    color: #222;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <GlobalStyle />
    <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
    </>
  );
}
