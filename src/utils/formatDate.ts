export function formatBirthDate(iso: string) {
  const dt = new Date(iso);
  return dt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
