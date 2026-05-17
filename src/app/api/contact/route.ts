import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.flatten().fieldErrors;
    const first = Object.values(msg).flat()[0];
    return NextResponse.json({ error: first ?? "Validation failed" }, { status: 400 });
  }

  const data = parsed.data;
  console.log("[contact] new submission", {
    to: "intraqamail@gmail.com",
    from: data.email,
    ...data,
  });

  return NextResponse.json({
    ok: true as const,
    message: "Thanks   we'll reply within one business day.",
  });
}
