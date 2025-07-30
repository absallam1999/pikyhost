import isInvalidValue from "./InvalidValue";

export default function EditableInput ({ value, onChange, onBlur, placeholder }) {
  if (isInvalidValue(value)) return null;
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};