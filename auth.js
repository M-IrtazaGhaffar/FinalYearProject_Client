import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { id, email, name, owner, type, token } = credentials;

        return {
          id: id,
          email: email,
          type: type,
          owner: owner,
          token: token,
          name: name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;
      const { nextUrl } = request;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/auth/organization") && isLoggedIn && auth?.user?.type === "organization")
        return Response.redirect(new URL("/dashboard/organization", nextUrl));
      
      if (pathname.startsWith("/auth/retailer") && isLoggedIn && auth?.user?.type === "retailer")
        return Response.redirect(new URL("/dashboard/retailer", nextUrl));
      
      if (pathname.startsWith("/dashboard/organization") && isLoggedIn && auth?.user?.type === "retailer")
        return Response.redirect(new URL("/dashboard/retailer", nextUrl));

      if (pathname.startsWith("/dashboard/retailer") && isLoggedIn && auth?.user?.type === "organization")
        return Response.redirect(new URL("/dashboard/organization", nextUrl));

      if (pathname.startsWith("/dashboard") && !isLoggedIn)
        return Response.redirect(new URL("/", nextUrl));

      return true;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
