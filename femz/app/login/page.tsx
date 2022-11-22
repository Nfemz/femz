"use client";
import Card from "../../components/Card";
import Input from "../../components/Input";

export default function LoginPage() {
  return (
    <Card>
      <div className="flex flex-col space-y-8">
        <Input.Text label="Username" />
        <Input.Text label="Password" />
      </div>
    </Card>
  );
}
