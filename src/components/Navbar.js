import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { IoSearchSharp } from "react-icons/io5";


const navAnimate = keyframes`
    from{
        top:-7rem;
    }
    to{
        top: 0;
    }
`;


const Logo = styled.img`
  width: 15rem;
  @media (max-width: 640px) {
    width: 8rem;
  }
`;

const MenuBurger = styled.div`
  width: 4rem;
  ${(props) => (props.open ? `height: 0px;` : `height: 2px;`)}
  background-color: #fcfcfc;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  &::before,
  &::after {
    content: "";
    width: 4rem;
    height: 2px;
    background-color: white;
    position: absolute;
    transition: all 0.25s ease-in;

    left: 0;
  }
  &::after {
    ${(props) =>
      props.open
        ? `transform: rotate(45deg);
    top: 0rem;`
        : `transform: rotate(0);
    top: 1.3rem;`}
  }
  &::before {
    ${(props) =>
      props.open
        ? `transform: rotate(-45deg);
        top:0rem;`
        : `treansform:rotate(0);
        top:-1.3rem`}
  }
  @media (max-width: 640px) {
    width: 3rem;
    &::before,
    &::after {
      width: 3rem;
    }
  }
`;
const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;
const MenuContainer = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
  position: relative;
  /* position: fixed;
  top: 0;
  left: 0; */
  z-index: 20;
  @media (max-width: 640px) {
    height: 3rem;
    width: 3rem;
  }
`;

const Container = styled.nav`
  transition: all 0.4s ease-in-out;
  height: 7rem;
  width: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  z-index: 15;
  background-color: transparent;
  position: ${(props) => (props.soft ? "absolute" : "relative")};
  top: 0;
  ${MenuContainer} {
    background-color: rgba(0, 0, 0, 0.4);
  }
  &.active {
    animation: ${navAnimate} 0.3s ease-in;
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    backdrop-filter: blur(2rem);
    ${MenuContainer} {
      background-color: transparent;
    }
  }
`;
const Search = styled(Link)``;
const SearchIcon = styled(IoSearchSharp)`
  font-size: 5rem;
  color: orange;
  margin-right: 1.5rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: white;
  }
  @media (max-width: 640px) {
    font-size: 3rem;
    margin-right: 1rem;
  }
`;
const Navbar = (props) => {
  const { soft } = props;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  useEffect(() => {
    const eventHandler = () => {
      window.scrollY > 140 ? setScrollEffect(true) : setScrollEffect(false);
    };
    window.addEventListener("scroll", eventHandler);
    return () => {
      window.removeEventListener("scroll", eventHandler);
    };
  }, [scrollEffect]);

  return (
      <Container className={scrollEffect && `active`} soft={!!soft}>
        <Link to="/">
          <Logo src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
        </Link>
        <LeftSide>
        <GoogleAuth />
          <Search to="/search"><SearchIcon/></Search>
          <MenuContainer onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <MenuBurger open={menuIsOpen} />
          </MenuContainer>
        </LeftSide>
      </Container>

    
  );
};

export default Navbar;
