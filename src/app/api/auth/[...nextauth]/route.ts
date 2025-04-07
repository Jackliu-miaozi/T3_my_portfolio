import { handlers } from "@/server/auth";

export const { GET, POST } = handlers;

// export const runtime = 'edge'

// export const authOptions = {
//   useSecureCookies: true,
//   cookies: {
//     sessionToken: {
//       name: `__Secure-next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: true
//       }
//     }
//   }
// }
