/**
 * Renders a JSON-LD structured-data script. Server component — safe to place
 * anywhere in the page body. `data` is a plain schema.org object.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is not user input; it's built from our own constants.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
