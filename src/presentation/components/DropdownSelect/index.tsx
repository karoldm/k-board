import { Form } from "react-bootstrap";

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  options: Option<T>[];
  onSelect: (value: Option<T>) => void;
};

export const DropdownSelect = <T extends string | number>({ options, onSelect }: Props<T>) => {
  return (
    <Form.Select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
        onSelect({ value: e.target.value as T, label: e.target.selectedOptions[0].text })
      }
    >
      <option></option>
      {options.map((option) => (
        <option key={option.value.toString()} value={option.value.toString()}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};
