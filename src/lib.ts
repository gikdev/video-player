type Nullable<T> = T | null

const enum Speed { 
  slower = 0.50,
  slow = 0.75,
  normal = 1.00,
  fast = 1.50,
  faster = 2.00,
}

const enum Volume { 
  muted = 0,
  half = 0.5,
  full = 1,
}


function secondsToTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  const minutesWithZero = minutes > 9 ? minutes : `0${minutes}`
  const remainingSecondsWithZero = remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`
  return `${minutesWithZero}:${remainingSecondsWithZero}`
}


function $<T>(el: string): T {
  return document.querySelector(el) as T
}

export { Speed, Volume, secondsToTime, $ }
export type { Nullable }