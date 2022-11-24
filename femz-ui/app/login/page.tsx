"use client";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Form from "../../components/Form";

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  function onClick(vals: LoginFormValues) {
    console.log(vals);
  }
  return (
    <Card>
      <Form.Container<LoginFormValues>
        onSubmit={onClick}
        button={<Button text="Login" type="primary" />}
      >
        <Form.Item label="Username" value="username">
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
