//src/lib/getBaseUrl.ts
export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // Browser → relative path
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}
