import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const backend = (process.env.DASHBOARD_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

async function proxy(request, { params }) {
  const { path } = await params;
  if (!path?.every((part) => /^[a-zA-Z0-9_.-]+$/.test(part))) {
    return NextResponse.json({ detail: "Invalid dashboard URL." }, { status: 400 });
  }
  const origin = request.headers.get("origin");
  if (!["GET", "HEAD"].includes(request.method) && origin !== new URL(request.url).origin) {
    return NextResponse.json({ detail: "The request must come from this website." }, { status: 403 });
  }
  const headers = new Headers();
  for (const name of ["content-type", "x-csrftoken", "origin"]) {
    if (request.headers.has(name)) headers.set(name, request.headers.get(name));
  }
  const cookies = ["sessionid", "csrftoken"].flatMap((name) => {
    const cookie = request.cookies.get(`mia_dashboard_${name}`);
    return cookie ? [`${name}=${cookie.value}`] : [];
  });
  if (cookies.length) headers.set("cookie", cookies.join("; "));
  try {
    const upstream = await fetch(`${backend}/api/dashboard/${path.join("/")}/${new URL(request.url).search}`, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(30000),
    });
    const contentType = upstream.headers.get("content-type") || "";
    const response = contentType.includes("application/json")
      ? new NextResponse(await upstream.text(), { status: upstream.status, headers: { "Content-Type": "application/json" } })
      : NextResponse.json({ detail: upstream.status === 403
          ? "Security check failed. Refresh and sign in again. Check Django CSRF_TRUSTED_ORIGINS includes this website."
          : "The dashboard server could not complete the request." }, { status: upstream.status >= 400 ? upstream.status : 502 });
    response.headers.set("Cache-Control", "no-store");
    for (const cookie of upstream.headers.getSetCookie()) {
      const [pair, ...attributes] = cookie.split(";");
      const separator = pair.indexOf("=");
      const name = pair.slice(0, separator);
      if (!["sessionid", "csrftoken"].includes(name)) continue;
      const maxAge = attributes.find((part) => part.trim().toLowerCase().startsWith("max-age="));
      response.cookies.set(`mia_dashboard_${name}`, pair.slice(separator + 1), {
        httpOnly: true,
        secure: new URL(request.url).protocol === "https:",
        sameSite: "strict",
        path: "/api/dashboard",
        ...(maxAge ? { maxAge: Number(maxAge.split("=")[1]) } : {}),
      });
    }
    return response;
  } catch {
    return NextResponse.json({ detail: "Cannot reach Django. Check that the backend is running and its URL is configured." }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as DELETE };
