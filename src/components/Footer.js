import React from "react";
import styled from "styled-components";

const itemsData = {
  1: [
    { text: "FAQ", link: "#", column: 1 },
    { text: "Investor Relations", link: "#", column: 1 },
    { text: "Ways to Watch", link: "#", column: 1 },
    { text: "Impressum", link: "#", column: 1 },
    { text: "Only on Netflix", link: "#", column: 1 },
  ],
  2: [
    { text: "Help Center", link: "#", column: 2 },
    { text: "Jobs", link: "#", column: 2 },
    { text: "Ways to Watch", link: "#", column: 2 },
    { text: "Terms of Use", link: "#", column: 2 },
    { text: "Contact Us", link: "#", column: 2 },
  ],
  3: [
    { text: "Account", link: "#", column: 3 },
    { text: "Redeem Gift Cards", link: "#", column: 3 },
    { text: "Privacy", link: "#", column: 3 },
    { text: "Terms of Use", link: "#", column: 3 },
    { text: "Speed Test", link: "#", column: 3 },
  ],
  4: [
    { text: "Media Center", link: "#", column: 4 },
    { text: "Buy Gift Cards", link: "#", column: 4 },
    { text: "Cookie Preferences", link: "#", column: 4 },
    { text: "Terms of Use", link: "#", column: 4 },
    { text: "Legal Notices", link: "#", column: 4 },
  ],
};

const Title = styled.h4`
  font-size: 2rem;
  color: #757575;
  font-weight: 400;
  & a {
    color: inherit;
    text-decoration: none;
  }
`;

const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
`;

const Column = styled.div`
  flex: 1;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Item = styled.li`
  list-style: none;
  color: #757575;
  font-size: 1.7rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  & a {
    color: #757575;
    &:hover {
      color: rgba(200, 190, 200, 1);
    }
  }
`;

const CopyRight = styled.p`
  font-size: 2rem;
  color: #757575;
`;

const Container = styled.div`
  margin-top: 5rem;
  max-width: 110rem;
  padding: 4rem;

  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: auto;
  border-top: 0.5rem solid gray;
  @media (max-width: 640px) {
    ${ColumnContainer} {
      flex-direction: column;
    }
    ${Column} {
      width: 100%;
      margin-bottom: 3rem;
      border-left: 1px solid #757575;
      padding-left: 2rem;
    }
  }
`;

const Footer = () => {
  const renderColumn = () => {
    const finalData = [];
      for (const col in itemsData) {
      finalData.push(
        <Column key={itemsData[col][0].column}>
          <List>
            {itemsData[col].map((item , index) => (
              <Item key={index}>
                <a onClick={(e) => e.preventDefault()} href={item.link}>
                  {item.text}
                </a>
              </Item>
            ))}
          </List>
        </Column>
      );
    }
    return finalData;
  };

  return (
    <Container>
      <Title>
        Questions? Call <a href="tel:0800-000-7969">0800-000-7969</a>
      </Title>
      <ColumnContainer>{renderColumn()}</ColumnContainer>
      <CopyRight>©2021 by JetFlix Ltd.</CopyRight>
    </Container>
  );
};

export default Footer;
