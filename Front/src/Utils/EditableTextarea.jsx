export default function EditableTextarea({ value, onChange, onBlur, placeholder }) {
  let textValue = "";

  if (Array.isArray(value)) {
    textValue = value.join("\n");
  } else if (typeof value === "object" && value !== null) {
    textValue = value.value || "";
  } else if (typeof value === "string") {
    textValue = value;
  }

  if (textValue.trim() === "") return null;

  return (
    <textarea
      value={textValue}
      onChange={(e) => {
        const inputValue = e.target.value;

        if (Array.isArray(value)) {
          const arr = inputValue
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line);
          onChange(arr);
        } else if (typeof value === "object" && value !== null) {
          onChange({
            key: value.key || "",
            text: inputValue, 
            value: inputValue,
          });
        } else {
          onChange(inputValue);
        }
      }}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
}
