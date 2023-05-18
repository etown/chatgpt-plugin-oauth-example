import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  } else if (status === "authenticated") {
    return <p>Signed in as {session.user.name}</p>
  } else {
    return <a href="/api/auth/signin">Sign in</a>
  }
}