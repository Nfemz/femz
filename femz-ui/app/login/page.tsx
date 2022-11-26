"use client";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Form from "../../components/Form";
import useLoginUser from "../../graphql/mutations/loginUser";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginUser, { loading }] = useLoginUser();
  const [loginErrors, setLoginErrors] = useState<string[]>([]);

  function submitLoginForm(vals: LoginFormValues) {
    loginUser({
      variables: {
        input: {
          ...vals,
        },
      },
      onError: ({ graphQLErrors }) => {
        setLoginErrors(graphQLErrors.map((err) => err.message));
      },
    });
  }

  return (
    <Card>
      <Form.Container<LoginFormValues>
        onSubmit={submitLoginForm}
        button={<Button text="Login" type="primary" loading={loading} />}
        errors={loginErrors}
      >
        <Form.Item label="Email" value="email">
          <Input.Text />
        </Form.Item>
        <Form.Item label="Password" value="password">
          <Input.Text />
        </Form.Item>
      </Form.Container>
      <Form.Footer>
        <Button text="Signup" onClick={() => {}} type="secondary" />
      </Form.Footer>
    </Card>
  );
}
