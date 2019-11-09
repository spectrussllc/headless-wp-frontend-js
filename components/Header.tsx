import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";
import "normalize.css";
import "../scss/style.scss";

const Header: StyledComponent<"section", any, {}, never> = styled.header``;

export default (): ReactElement =>
    <Header id="masthead">
    </Header>