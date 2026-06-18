export function formatNewsDate(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  })
    .format(date)
    .toUpperCase()
    .replace(",", ",");
}

/** e.g. "MAR, 9" for Politely RAW cards */
export function formatNewsDatePolitelyRaw(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  return formatted.toUpperCase().replace(" ", ", ");
}

export function formatNewsDateLong(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(date)
    .toUpperCase()
    .replace(",", ",");
}
