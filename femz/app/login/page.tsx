"use client";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Form from "../../components/Form";

export default function LoginPage() {
  function onClick(vals: any) {
    console.log(vals);
  }
  return (
    <Card>
      <Form.Container
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
    </Card>
  );
}
