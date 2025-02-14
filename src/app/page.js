'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState(null)
  const [error, setError] = useState(null)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    setShowText(true) // Déclenche l'animation du texte au chargement
    try {
      const audioElement = new Audio('/mon-amour.mp3')
      
      audioElement.addEventListener('loadeddata', () => {
        console.log('Audio chargé avec succès')
        setError(null)
      })

      audioElement.addEventListener('error', (e) => {
        console.error('Erreur de chargement audio:', e)
        setError('Erreur de chargement de la musique')
      })

      audioElement.preload = 'auto'
      setAudio(audioElement)

      return () => {
        audioElement.pause()
        audioElement.src = ''
      }
    } catch (err) {
      console.error('Erreur lors de l\'initialisation de l\'audio:', err)
      setError('Erreur d\'initialisation de l\'audio')
    }
  }, [])

  const handlePlay = async () => {
    if (!audio) {
      console.error("L'audio n'est pas chargé")
      return
    }

    try {
      if (isPlaying) {
        await audio.pause()
        audio.currentTime = 0
      } else {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          console.log('Lecture démarrée')
        }
      }
      setIsPlaying(!isPlaying)
      setError(null)
    } catch (err) {
      console.error('Erreur lors de la lecture:', err)
      setError('Erreur de lecture de la musique')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 flex items-center justify-center p-4">
      <div className={`
        w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl 
        overflow-hidden p-8 transition-all duration-700 ease-in-out
        ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <Heart className={`
              text-red-500 w-16 h-16 
              ${isPlaying ? 'animate-bounce' : 'animate-pulse'}
              transition-transform duration-300 hover:scale-110
            `} />
          </div>
          
          <h1 className={`
            text-4xl font-bold mb-6
            transition-colors duration-500
            ${isPlaying ? 'text-pink-600' : 'text-red-600'}
            hover:text-red-500 cursor-default
          `}>
            Ma douce Valentine ❤️
          </h1>
          
          <p className={`
            text-lg leading-relaxed mb-8 whitespace-pre-line
            transition-all duration-500
            ${isPlaying ? 'text-pink-700' : 'text-gray-700'}
            hover:text-red-600 cursor-default
          `}>
            {`En ce jour spécial, je veux te dire à quel point tu es importante pour moi.
            Chaque moment passé avec toi est un cadeau précieux.
            
            Je t'aime plus que tout au monde.`}
          </p>

          <button
            onClick={handlePlay}
            className={`
              px-8 py-4 rounded-full text-lg font-semibold
              transform transition-all duration-300 ease-in-out
              ${isPlaying 
                ? 'bg-red-100 text-red-600 scale-95 hover:bg-red-200'
                : 'bg-red-600 text-white hover:bg-red-500 hover:scale-105'
              }
              flex items-center justify-center gap-3
              shadow-lg hover:shadow-xl
              w-full sm:w-auto mx-auto
            `}
          >
            <Heart className={`
              w-6 h-6 transition-transform duration-300
              ${isPlaying ? 'animate-ping' : 'hover:scale-125'}
            `} />
            {isPlaying ? 'Notre chanson joue...' : 'Écoute notre chanson ♫'}
          </button>

          {error && (
            <p className="text-red-500 mt-4 animate-pulse">{error}</p>
          )}
        </div>
      </div>
    </main>
  )
}