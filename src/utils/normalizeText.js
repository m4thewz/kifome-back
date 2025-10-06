export default function normalizeText(text) {
  if (!text) return null;
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}
