import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const handle = createMiddleware({
  
  locales: ["en", "es"],

  
  defaultLocale: "en",
});

export default function proxy(request: NextRequest) {
  return handle(request);
}

export const config = {
  
  matcher: ["/", "/(es|en)/:path*"],
};
