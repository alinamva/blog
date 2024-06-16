import { Lucia, Session, TimeSpan } from "lucia";

import db from "./db/migrate";
import { sessionTable, usersTable } from "./db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { cookies } from "next/headers";
import { User } from "lucia";
import { cache } from "react";
import { getSessionsByUserId } from "./actions";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, usersTable);

const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return { user: null, session: null };
  }

  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  return { user, session };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export { lucia };
