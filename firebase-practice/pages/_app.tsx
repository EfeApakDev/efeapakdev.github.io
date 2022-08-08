import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { onAuthStateChanged } from "firebase/auth"
import { authService } from "@FireBase"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        router.push("/")
      } else {
        history.pushState(null, "", location.href)
        window.onpopstate = function () {
          history.go(1)
        }
        router.push("/auth")
      }
    })
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
