import { useState, useRef, useCallback, useEffect } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________abcdefghijklmnopqrstuvwxyz0123456789'

export default function ScrambleText({ text, as: Tag = 'span', className = '', start = false }) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef(null)
  const scramblingRef = useRef(false)
  const pendingRef = useRef(false)
  const startedRef = useRef(false)

  const words = text.split(/(\s+)/)

  const scramble = useCallback(() => {
    if (scramblingRef.current) {
      pendingRef.current = true
      return
    }

    scramblingRef.current = true
    let step = 0
    const wordBoundaries = []
    let pos = 0
    for (let w = 0; w < words.length; w++) {
      wordBoundaries.push(pos)
      pos += words[w].length
    }
    wordBoundaries.push(pos)

    const charsPerWord = words.map(w => w.length)
    const totalDisplayChars = text.length
    const stepsPerWord = 8

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      step++
      const currentWordIdx = Math.min(Math.floor(step / stepsPerWord), words.length - 1)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            let wordIndex = 0
            let cumLen = 0
            for (let w = 0; w < words.length; w++) {
              cumLen += words[w].length
              if (i < cumLen) {
                wordIndex = w
                break
              }
            }
            const wordStart = wordBoundaries[wordIndex]
            const offsetInWord = i - wordStart

            if (wordIndex < currentWordIdx) return text[i]
            if (wordIndex === currentWordIdx) {
              if (step - (wordIndex * stepsPerWord) > offsetInWord + 3) return text[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (step >= (words.length) * stepsPerWord + 4) {
        clearInterval(intervalRef.current)
        setDisplay(text)
        scramblingRef.current = false
        if (pendingRef.current) {
          pendingRef.current = false
          scramble()
        }
      }
    }, 60)
  }, [text, words])

  useEffect(() => {
    if (start && !startedRef.current) {
      startedRef.current = true
      const t = setTimeout(scramble, 0)
      return () => clearTimeout(t)
    }
  }, [start, scramble])

  useEffect(() => {
    if (!start) return
    const interval = setInterval(scramble, 7000)
    return () => clearInterval(interval)
  }, [start, scramble])

  const handleEnter = () => {
    scramble()
  }

  const handleLeave = () => {
    pendingRef.current = false
  }

  return (
    <Tag
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {display}
    </Tag>
  )
}
