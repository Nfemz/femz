import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput) {
    loginUser(input: $input) {
      email
      id
      token
    }
  }
`;

const useLoginUser = (args?: any) => useMutation(LOGIN_USER, args);

export default useLoginUser;
