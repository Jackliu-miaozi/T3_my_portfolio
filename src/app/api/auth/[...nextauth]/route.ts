// This is Auth.js 5, the successor to NextAuth 4
import arcjet, { detectBot, fixedWindow, shield, slidingWindow } from "@/lib/arcjet";
import { handlers } from "@/server/auth";
import ip from "@arcjet/ip";
import { NextRequest, NextResponse } from "next/server";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet
  .withRule(
    // Shield detects suspicious behavior, such as SQL injection and cross-site
    // scripting attacks.
    shield({
      mode: "LIVE",
    }),
  )
  .withRule(
    slidingWindow({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      interval: 60, // tracks requests across a 60 second sliding window
      max: 10, // allow a maximum of 10 requests
    }),
  )
  .withRule(
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      allow: [], // "allow none" will block all detected bots
    }),
  )
 .withRule(
    fixedWindow({
        mode: "LIVE",
        max: 5,
        window: "60s",
      }),
 )

// Protect the sensitive actions e.g. login, signup, etc with Arcjet
const ajProtectedPOST = async (req: NextRequest) => {
  // Next.js 15 doesn't provide the IP address in the request object so we use
  // the Arcjet utility package to parse the headers and find it. If we're
  // running in development mode, we'll use a local IP address.
  const userIp: string =
    process.env.NODE_ENV === "development"
      ? " 127.0.0.1"
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ((ip(req) as string | null | undefined) ?? "0.0.0.0");
  const decision = await aj.protect(req, { fingerprint: userIp });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return handlers.POST(req);
};

// You could also protect the GET handler, but these tend to be less sensitive
// so it's not always necessary
const GET = async (req: NextRequest) => {
  return handlers.GET(req);
};

export { GET, ajProtectedPOST as POST };
