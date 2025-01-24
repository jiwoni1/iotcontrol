import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: "white";
  position: relative;
`;

const Layout = ({ children }) => {
  return (
    <PageWrapper>
      <Container>{children}</Container>
    </PageWrapper>
  );
};

export default Layout;
