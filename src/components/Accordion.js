import React, { useState } from "react";
import styled from "styled-components";

const DummyData = [
  {
    id: 1,
    title: "What can I watch on Netflix?",
    content: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`,
  },
  {
    id: 2,
    title: "What is Netflix?",
    content: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.

You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`,
  },
  {
    id: 3,
    title: "How much does Netflix cost?",
    content: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from €7,99 to €17,99 a month. No extra costs, no contracts.`,
  },
  {
    id: 4,
    title: "Where can I watch?",
    content: `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.

Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.
`,
  },
  {
    id: 5,
    title: "How do I cancel?",
    content: `Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
`,
  },
  {
    id: 6,
    title: "Is Netflix good for kids?",
    content: `Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
`,
  },
];
const AccordionContainer = styled.div`
  /* height: 50rem; */
  background-color: black;
`;
const Item = styled.div`
  width: 90rem;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #303030;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  position: relative;
`;
const Icon = styled.div`
  position: absolute;
  right: 2rem;
  top: 0;
  font-size: 6rem;
  font-weight: 300;
  display: flex;
  align-items: stretch;
  justify-content: center;
  transition: all 0.2s linear;
  transform: rotate(${(props) => (props.active ? "0deg" : "45deg")});
  color: white;
  user-select: none;
`;
const Title = styled.h4`
  font-size: 3.5rem;
  color: #fcfcfc;
  font-weight: 400;
  width: 100%;
  cursor: pointer;
  padding: 2rem 3rem;
`;
const Content = styled.p`
  transition: all 250ms linear;
  font-size: 2.5rem;
  color: #f1f1f1;
  /* transform: scaleY(0); */
  overflow: hidden;
  transform-origin: top;
  /* transform: ${(props) => props.active && "scaleY(1)"}; */
  max-height: ${(props) => (props.active ? "50rem" : "0")};
  padding: ${(props) => (props.active ? "1rem 3rem 3rem" : "0 3rem 0")};
`;
const HeadingTitle = styled.h3`
font-size: 4.8rem;
color: white;
font-weight: 500;
width: 100%;
text-align: center;
margin-bottom: 4rem;


`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5rem;
  background-color: black;
  flex-wrap: wrap;
  @media (max-width: 640px) {
    padding: 4rem;
    ${HeadingTitle} {
      font-size: 3rem;
    }
    ${Item} {
    }
    ${Title} {
      font-size: 1.8rem;
      padding: 1rem;
    }
    ${Content} {
      font-size: 1.5rem;
      padding: 0 1rem;
    }
    ${Icon} {
      margin-top: 0.8rem;
      font-size: 2rem;
    }
    ${HeadingTitle}{
      font-size: 1.8rem;
    }
  }
`;

const Accordion = () => {
  const [activeItem, setActiveItem] = useState(null);
  const renderItems = DummyData.map((item, index) => {
    return (
      <Item
        onClick={() => {
          if (activeItem === item.id) {
            setActiveItem(null);
          } else {
            setActiveItem(item.id);
          }
        }}
        key={item.id}
      >
        <Icon active={item.id === activeItem}>&#10005;</Icon>
        <Title>{item.title}</Title>
        <Content
          onClick={(e) => {
            e.stopPropagation();
          }}
          active={item.id === activeItem}
        >
          {item.content}
        </Content>
      </Item>
    );
  });
  return (
    <Container>
      <HeadingTitle>Frequently Asked Questions</HeadingTitle>
      <AccordionContainer>{renderItems}</AccordionContainer>
    </Container>
  );
};

export default Accordion;
