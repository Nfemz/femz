import { Children, cloneElement, ReactElement, useState } from "react";

interface FormContainerProps {
  children: ReactElement<FormItemProps> | ReactElement<FormItemProps>[];
  onSubmit: (values: any) => void;
  button: ReactElement;
}

function Container({ children, onSubmit, button }: FormContainerProps) {
  const [formValues, setFormValues] = useState({});

  function onChange(newValues: any) {
    setFormValues((oldValues) => ({ ...oldValues, ...newValues }));
  }

  return (
    <div className="flex flex-col space-y-8">
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
  function handleChange(e: any) {
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

const Form = {
  Container,
  Item,
};

export default Form;
