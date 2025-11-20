import { NextResponse } from "next/server";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const id = request.cookies.get("id")?.value;
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  // -----------------------------
  // 1️⃣ Not logged in → redirect
  // -----------------------------
  if (!token || !role || !id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // -----------------------------------------
  // 2️⃣ Verify token from your external API
  // -----------------------------------------
  let result;
  try {
    const verifyReq = await fetch("http://localhost:8000/api/user/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "id":`${id}`, "token":token,  "role":role }),
    });

    result = await verifyReq.json();
  } catch (error) {
    console.error("Token verify failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // -----------------------------
  // 3️⃣ Token INVALID → redirect
  // -----------------------------
  // Backend must send: { valid: true/false }
  if (!result.valid) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("id");
    response.cookies.delete("role");
    return response;
  }

  // -----------------------------
  // 4️⃣ Role Based Protection
  // -----------------------------
   // ADMIN
  if (path.startsWith("/admin") && !["1", "2"].includes(role)) {
  return NextResponse.redirect(new URL("/no-access", request.url));
}

  // // ADMIN
  // if (path.startsWith("/admin") && role !== "1") {
  //   return NextResponse.redirect(new URL("/no-access", request.url));
  // }

  // // USER
  // if (path.startsWith("/user") && role !== "2") {
  //   return NextResponse.redirect(new URL("/no-access", request.url));
  // }

  // // PROVIDER
  // if (path.startsWith("/provider") && role !== "3") {
  //   return NextResponse.redirect(new URL("/no-access", request.url));
  // }

  // Everything OK → continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/provider/:path*",
  ],
};


////////////// ============

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("token")?.value;
//   const role = request.cookies.get("role")?.value;
//   const path = request.nextUrl.pathname;

//   // No login → redirect to /login
//   if (!token || !role) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // --------------------
//   // ADMIN PROTECTED
//   // --------------------
//   if (path.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(new URL("/no-access", request.url));
//   }

//   // --------------------
//   // USER PROTECTED
//   // --------------------
//   if (path.startsWith("/user") && role !== "user") {
//     return NextResponse.redirect(new URL("/no-access", request.url));
//   }

//   // --------------------
//   // PROVIDER PROTECTED
//   // --------------------
//   if (path.startsWith("/provider") && role !== "provider") {
//     return NextResponse.redirect(new URL("/no-access", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/user/:path*",
//     "/provider/:path*",
//   ],
// };






/////////////=================























// import { NextResponse } from "next/server";

// export function proxy(request) {
//   const u = 1; // your condition
//   const p = 3; // your condition

//   // If u is not valid → redirect
//   if (u !== 1) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // If p is not valid → redirect
//   if (p !== 2) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Both valid → allow access
//   return NextResponse.next();
// }

// // Apply middleware to BOTH routes
// export const config = {
//   matcher: [
//     "/user/:path*",
//     "/provider/:path*"
//   ],
// };
