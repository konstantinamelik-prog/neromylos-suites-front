export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateOnly(isoString: string): string {
  const [year, month, day] = isoString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}
