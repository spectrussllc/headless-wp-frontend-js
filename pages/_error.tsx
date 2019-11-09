import { NextFunctionComponent, NextContext } from "next";

const Error: NextFunctionComponent = (): null => null;

Error.getInitialProps = async ({ res }: NextContext): Promise<void> => {
    if (res) {
        const { writeHead, end } = res;
        if (writeHead) writeHead(302, { Location: "/" });
        if (end) end();
    }
}

export default Error;
