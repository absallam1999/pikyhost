export default function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};
