import { gql, useMutation } from "@apollo/client";
import {
  LoginUserMutationVariables,
  LoginUserMutation,
} from "../types/graphql";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput) {
    loginUser(input: $input) {
      email
      id
      token
    }
  }
`;

const useLoginUser = (args?: any) =>
  useMutation<LoginUserMutation, LoginUserMutationVariables>(LOGIN_USER, args);

export default useLoginUser;
