import { gql, useMutation } from "@apollo/client";
import {
  SignupUserMutation,
  SignupUserMutationVariables,
} from "../types/graphql";

const SIGNUP_USER = gql`
  mutation SignupUser($input: SignupUserInput) {
    signupUser(input: $input) {
      email
      token
    }
  }
`;

const useSignupUser = (args?: any) =>
  useMutation<SignupUserMutation, SignupUserMutationVariables>(
    SIGNUP_USER,
    args
  );

export default useSignupUser;
