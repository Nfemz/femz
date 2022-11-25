import { gql, useMutation } from "@apollo/client";

const SIGNUP_USER = gql`
  mutation SignupUser($input: SignupUserInput) {
    signupUser(input: $input) {
      email
      token
    }
  }
`;

const useSignupUser = (args?: any) => useMutation(SIGNUP_USER, args);

export default useSignupUser;
