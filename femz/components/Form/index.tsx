import {
  ChangeEvent,
  Children,
  cloneElement,
  ReactElement,
  useState,
} from "react";

interface FormContainerProps {
  children: ReactElement<FormItemProps> | ReactElement<FormItemProps>[];
  onSubmit: (values: any) => void;
  button: ReactElement;
}

function Container<FormValueTypes>({
  children,
  onSubmit,
  button,
}: FormContainerProps) {
  const [formValues, setFormValues] = useState({});

  function onChange(newValues: FormValueTypes) {
    setFormValues((oldValues) => ({ ...oldValues, ...newValues }));
  }

  return (
    <div className="flex flex-col space-y-5">
      {Children.map(children, (child) => cloneElement(child, { onChange }))}
      {cloneElement(button, { onClick: () => onSubmit(formValues) })}
    </div>
  );
}

interface FormItemProps {
  children: ReactElement;
  label?: string;
  value: string;
  onChange?: (value: any) => void;
}

function Item({ children, label, onChange, value }: FormItemProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange({ [value]: e.target.value });
  }

  return (
    <div id={`form-${label}`}>
      {label && (
        <label
          className="block text-sm text-gray-700 font-bold mb-2"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      {cloneElement(children, { onChange: handleChange })}
    </div>
  );
}

interface FormFooterProps {
  children: ReactElement | ReactElement[];
}

function Footer({ children }: FormFooterProps) {
  return <div className="flex flex-col space-y-5 mt-5">{children}</div>;
}

const Form = {
  Container,
  Item,
  Footer,
};

export default Form;
