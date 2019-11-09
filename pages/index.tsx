import { ReactElement } from "react";
import { NextContext } from "next";
import { getPage } from "../helpers/wp-json";
import { NextFunctionComponent } from "next";
import PageProps from "../interfaces/PageProps";
import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: NextFunctionComponent<PageProps> = ({ page }: PageProps): ReactElement => {
    return (
        <>
            <Head page={page} />
            <Header />
            <article id={`page-${page.ID}`}>
            </article>
            <Footer />
        </>
    );
}

Home.getInitialProps = async ({ pathname }: NextContext): Promise<PageProps> => ({ page: await getPage(pathname) });

export default Home;
