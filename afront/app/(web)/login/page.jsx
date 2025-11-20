"use client";

export default function LoginPage() {
  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      // redirect based on role
      const role = (await res.json()).role;
      if (role === "1") window.location.href = "/admin";
      else if (role === "provider") window.location.href = "/provider";
      else window.location.href = "/user";
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input name="email" placeholder="Email" />
      <input name="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
