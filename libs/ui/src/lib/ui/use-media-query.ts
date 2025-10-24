import { screenSizes } from "@apollo/constants"
import { ScreenSize } from "@apollo/types"
import { useEffect, useState } from "react"



export const useMediaQuery = (min: ScreenSize, max?: ScreenSize): boolean => {
  const query = `(min-width: ${screenSizes[min]})${max ? ` and (max-width: calc(${screenSizes[max]} - 1px))` : ""
    }`

  const getMatch = () => window.matchMedia(query).matches

  const [matches, setMatches] = useState<boolean>(
    typeof window !== "undefined" ? getMatch() : false
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)

    // Initial value and subscription
    setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
