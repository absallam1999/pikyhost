export default function isInvalidValue(val) {
  return (
    !val ||
    (typeof val === "object" && val !== null && Object.keys(val).length === 0) ||
    String(val) === "[object Object]"
  );
}