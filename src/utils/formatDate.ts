export function formatDate(dateToFormat: string): string {
  const date = new Date(dateToFormat);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function formatDateWithHour(dateString: string): string {
  const date = new Date(dateString);

  const utcOffset = -3;
  const brDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);

  const day = String(brDate.getUTCDate()).padStart(2, "0");
  const month = String(brDate.getUTCMonth() + 1).padStart(2, "0");
  const year = brDate.getUTCFullYear();

  const hours = String(brDate.getUTCHours()).padStart(2, "0");
  const minutes = String(brDate.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
