import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { clientId } from "./clientId";
import styled from "styled-components";

const SignInBtn = styled.a`
  margin-right: 2rem;
  color: white;
  padding: 1rem 2rem;
  background-color: #e50914;
  font-size: 1.8rem;
  white-space: nowrap;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  @media (max-width: 640px) {
    padding: 0.4rem 0.8rem;
    font-size: 1.3rem;
  }
`;
const SignOutBtn = styled(SignInBtn)`
  background-color: gray;
`;

let googleAuther;

const GoogleAuth = (props) => {
  const { signIn, signOut, isSignedIn } = props;

  const userSignedChange = useCallback(
    (SignedIn) => {
      if (SignedIn) {
        signIn(googleAuther.currentUser.get().getId());
      } else {
        signOut();
      }
    },
    [signIn, signOut]
  );
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId,
          scope: "email",
        })
        .then(async () => {
          googleAuther = window.gapi.auth2.getAuthInstance();
          userSignedChange(googleAuther.isSignedIn.get());
          googleAuther.isSignedIn.listen(userSignedChange);
        });
    });
  }, [userSignedChange]);

  const onClickSignOut = () => {
    googleAuther.signOut();
  };
  const onClickSignIn = () => {
    googleAuther.signIn();
  };

  const renderButton = () => {
    if (isSignedIn === null) {
      return <SignInBtn>Loading...</SignInBtn>;
    } else if (isSignedIn) {
      return <SignOutBtn onClick={onClickSignOut}>Sign Out</SignOutBtn>;
    } else {
      return <SignInBtn onClick={onClickSignIn}>Sign In</SignInBtn>;
    }
  };

  return <>{renderButton()}</>;
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
    // userId: state.user.userId,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
