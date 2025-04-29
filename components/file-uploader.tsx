"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileSelected: (file: File) => void
  acceptedTypes: string
}

export function FileUploader({ onFileSelected, acceptedTypes }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelected(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors duration-200",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        <Upload
          className={cn("h-8 w-8 transition-colors duration-200", isDragging ? "text-blue-600" : "text-blue-500")}
        />
      </div>

      <h3 className="text-lg font-medium mb-2">Drag & Drop your file here</h3>
      <p className="text-sm text-gray-500 mb-4">or click to browse from your computer</p>

      <Button onClick={handleButtonClick} variant="outline" className="relative overflow-hidden group">
        <File className="mr-2 h-4 w-4" />
        Select File
        <span className="absolute inset-0 w-full h-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
      </Button>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={acceptedTypes} className="hidden" />

      <p className="text-xs text-gray-400 mt-4">Accepted file types: {acceptedTypes}</p>
    </div>
  )
}
