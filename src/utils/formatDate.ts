export function formatDate(dateToFormat: string, includeTime: boolean = false): string {
  const date = new Date(dateToFormat);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  if (includeTime) {
    return `${formattedDate} ${hours}:${minutes}:${seconds}`;
  }

  return formattedDate;
}
