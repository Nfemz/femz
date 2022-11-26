"use client";
import { useContext, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { AuthContext } from "../../context/authContext";
import useSignupUser from "../../graphql/mutations/signupUser";

interface SignupFormValues {
  email: string;
  password: string;
  passwordCopy: string;
}

export default function SignupPage() {
  const [signupUser, { loading }] = useSignupUser();
  const [signupErrors, setSignupErrors] = useState<string[]>([]);

  function submitSignupForm(values: SignupFormValues) {
    signupUser({
      variables: {
        input: {
          ...values,
        },
      },
      onError: (e) => {
        setSignupErrors(e.graphQLErrors.map((err) => err.message));
      },
      onCompleted: (data) => {
        setSignupErrors([]);
      },
    });
  }

  return (
    <Card>
      <Form.Container<SignupFormValues>
        onSubmit={submitSignupForm}
        button={<Button text="Signup" type="primary" loading={loading} />}
        errors={signupErrors}
      >
        <Form.Item label="First name" value="firstName">
          <Input.Text />
        </Form.Item>
        <Form.Item label="Email" value="email">
          <Input.Text />
        </Form.Item>
        <Form.Item label="Password" value="password">
          <Input.Text type="password" />
        </Form.Item>
        <Form.Item label="Re-enter password" value="passwordCopy">
          <Input.Text type="password" />
        </Form.Item>
      </Form.Container>
    </Card>
  );
}
