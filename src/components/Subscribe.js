import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Header = styled.h3`
  width: 100%;
  font-size: 2.9rem;
  font-weight: 400;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  margin-bottom: 2rem;
`;
const EmailInput = styled(Field)`
  height: 7rem;
  width: 55rem;
  border: none;
  outline: none;
  padding: 1.5rem;
  font-size: 2rem;
  &::placeholder {
    transition: all 200ms ease-in;
    font-size: 1.8rem;
  }
  &:focus::placeholder {
    font-size: 1.5rem;
    transform: translateY(-2rem);
  }
`;

const Button = styled.button`
  width: 30rem;
  height: 7rem;
  border: none;
  font-size: 2rem;
  color: white;
  background-color: #e50914;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: #8f0007;
  }
`;

const Error = styled.div`
  font-size: 2.1rem;
  color: rgb(255, 170, 0);
  margin-top: 1rem;
`;
const Container = styled.div`
  width: 100%;
  padding: 5rem;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 949px) {
    ${EmailInput} {
      width: 30rem;
    }
    ${Button} {
      width: 20rem;
    }
  }
  @media (max-width: 640px) {
    padding: 2rem;
    ${Header} {
      font-size: 2rem;
    }
    ${EmailInput} {
      width: 19rem;
      height: 6rem;
    }
    ${Button} {
      width: 9rem;
      height: 6rem;
    }
    ${Error} {
      font-size: 1.5rem;
    }
  }
`;
const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});
const Subscribe = () => {
  return (
    <Container>
      <Header>
        Ready to watch? Enter your email to create or restart your membership.
      </Header>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={SubscribeSchema}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <Form>
            {/* <label htmlFor="email">Email</label> */}
            <EmailInput
              id="email"
              name="email"
              placeholder="Email address"
              type="email"
              autoComplete="off"
            />
            <Button type="submit">Submit</Button>
            {formik.touched.email && formik.errors.email ? (
              <Error>{formik.errors.email}</Error>
            ) : null}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Subscribe;
