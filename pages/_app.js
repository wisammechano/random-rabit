import "../styles/main.css";
import Head from "../comps/Head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head title="Random Rabbit" />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
