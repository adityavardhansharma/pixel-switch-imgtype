"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface ConversionProcessProps {
  isComplete: boolean
}

export function ConversionProcess({ isComplete }: ConversionProcessProps) {
  const [progress, setProgress] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    if (isComplete) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setShowComplete(true), 300)
            return 100
          }
          return prev + 5
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isComplete])

  return (
    <div className="py-4">
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {showComplete ? "Conversion complete!" : `Converting... ${progress}%`}
        </span>

        {showComplete && (
          <span className="flex items-center text-sm text-green-600 font-medium">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Complete
          </span>
        )}
      </div>
    </div>
  )
}
