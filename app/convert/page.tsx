"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { FileImage, Download, ArrowLeft, Loader2, Repeat } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ConversionProcess } from "@/components/conversion-process"
import { FileUploader } from "@/components/file-uploader"

export default function ConvertPage() {
  const [activeTab, setActiveTab] = useState("svg-to-png")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const [customWidth, setCustomWidth] = useState<number>(0)
  const [customHeight, setCustomHeight] = useState<number>(0)
  const [scaleOption, setScaleOption] = useState<number>(1)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [outputDimensions, setOutputDimensions] = useState({ width: 0, height: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const scaleOptions = [1, 2, 4, 8, 16, 32, 64]

  useEffect(() => {
    if (file && activeTab === "svg-to-png") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)

        // Create a temporary image to get dimensions
        const img = new Image()
        img.onload = () => {
          setSvgDimensions({ width: img.width, height: img.height })
          setCustomWidth(img.width)
          setCustomHeight(img.height)
          updateOutputDimensions(img.width, img.height, scaleOption)
        }
        img.src = result
      }
      reader.readAsDataURL(file)
    } else if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }, [file, activeTab])

  const updateOutputDimensions = (width: number, height: number, scale: number) => {
    const newWidth = Math.round(width * scale)
    const newHeight = Math.round(height * scale)

    setOutputDimensions({
      width: newWidth,
      height: newHeight,
    })

    // Also update the custom dimensions to match the scaled dimensions
    setCustomWidth(newWidth)
    setCustomHeight(newHeight)
  }

  const handleScaleChange = (value: number[]) => {
    const scale = value[0]
    setScaleOption(scale)
    updateOutputDimensions(svgDimensions.width, svgDimensions.height, scale)
  }

  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number.parseInt(e.target.value) || 0
    setCustomWidth(width)

    // Maintain aspect ratio if there's a height
    if (svgDimensions.height > 0 && svgDimensions.width > 0) {
      const aspectRatio = svgDimensions.width / svgDimensions.height
      setCustomHeight(Math.round(width / aspectRatio))
    }
  }

  const handleCustomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number.parseInt(e.target.value) || 0
    setCustomHeight(height)

    // Maintain aspect ratio if there's a width
    if (svgDimensions.width > 0 && svgDimensions.height > 0) {
      const aspectRatio = svgDimensions.width / svgDimensions.height
      setCustomWidth(Math.round(height * aspectRatio))
    }
  }

  const convertImage = async () => {
    if (!file) return

    setIsConverting(true)

    try {
      // Simulate conversion process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        let width, height

        if (activeTab === "svg-to-png") {
          // For SVG to PNG, use the custom dimensions which may have been set by scale factor or manual input
          width = customWidth
          height = customHeight
        } else {
          width = img.width
          height = img.height
        }

        // Set canvas dimensions to the output dimensions
        canvas.width = width
        canvas.height = height
        ctx.clearRect(0, 0, width, height)

        // For SVG scaling, we need to properly scale the image
        if (activeTab === "svg-to-png") {
          // Calculate the scale ratio based on original SVG dimensions
          const scaleX = width / svgDimensions.width
          const scaleY = height / svgDimensions.height

          // Draw the image with scaling applied
          ctx.drawImage(img, 0, 0, svgDimensions.width, svgDimensions.height, 0, 0, width, height)
        } else {
          // For other conversions, just draw normally
          ctx.drawImage(img, 0, 0, width, height)
        }

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setConvertedImage(url)
          }
          setIsConverting(false)
        }, getOutputFormat())
      }

      img.src = preview as string
    } catch (error) {
      console.error("Conversion error:", error)
      setIsConverting(false)
    }
  }

  const getOutputFormat = () => {
    switch (activeTab) {
      case "svg-to-png":
      case "jpg-to-png":
      case "webp-to-png":
        return "image/png"
      case "png-to-jpg":
        return "image/jpeg"
      default:
        return "image/png"
    }
  }

  const getOutputExtension = () => {
    switch (activeTab) {
      case "svg-to-png":
      case "jpg-to-png":
      case "webp-to-png":
        return ".png"
      case "png-to-jpg":
        return ".jpg"
      default:
        return ".png"
    }
  }

  const downloadImage = () => {
    if (!convertedImage || !file) return

    const link = document.createElement("a")
    link.href = convertedImage

    // Get original filename without extension
    const originalName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name

    // Create new filename with conversion info
    let newFilename = originalName

    if (activeTab === "svg-to-png") {
      newFilename += `_${customWidth}x${customHeight}`
    }

    newFilename += getOutputExtension()

    link.download = newFilename
    link.click()
  }

  const resetConversion = () => {
    setFile(null)
    setPreview(null)
    setConvertedImage(null)
    setSvgDimensions({ width: 0, height: 0 })
    setCustomWidth(0)
    setCustomHeight(0)
    setScaleOption(1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <Link
            href="https://github.com/adityavardhansharma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            GitHub
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter">
              Image <span className="text-blue-600">Converter</span>
            </h1>
            <p className="max-w-[700px] text-gray-500">
              Convert your images between different formats with precision and ease.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="svg-to-png">SVG to PNG</TabsTrigger>
              <TabsTrigger value="jpg-to-png">JPG to PNG</TabsTrigger>
              <TabsTrigger value="png-to-jpg">PNG to JPG</TabsTrigger>
              <TabsTrigger value="webp-to-png">WebP to PNG</TabsTrigger>
            </TabsList>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>
                  {activeTab === "svg-to-png" && "Convert SVG to PNG"}
                  {activeTab === "jpg-to-png" && "Convert JPG to PNG"}
                  {activeTab === "png-to-jpg" && "Convert PNG to JPG"}
                  {activeTab === "webp-to-png" && "Convert WebP to PNG"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "svg-to-png" && "Convert your SVG file to PNG with custom scaling options."}
                  {activeTab === "jpg-to-png" && "Convert your JPG file to PNG format."}
                  {activeTab === "png-to-jpg" && "Convert your PNG file to JPG format."}
                  {activeTab === "webp-to-png" && "Convert your WebP file to PNG format."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!file ? (
                  <FileUploader
                    onFileSelected={setFile}
                    acceptedTypes={
                      activeTab === "svg-to-png"
                        ? ".svg"
                        : activeTab === "jpg-to-png"
                          ? ".jpg,.jpeg"
                          : activeTab === "png-to-jpg"
                            ? ".png"
                            : ".webp"
                    }
                  />
                ) : !convertedImage ? (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 border rounded-lg p-4 flex items-center justify-center bg-gray-50">
                        {preview && (
                          <img
                            src={preview || "/placeholder.svg"}
                            alt="Preview"
                            className="max-w-full max-h-[300px] object-contain"
                          />
                        )}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">File Information</h3>
                          <p className="text-sm text-gray-500">Name: {file.name}</p>
                          <p className="text-sm text-gray-500">Size: {(file.size / 1024).toFixed(2)} KB</p>
                          {activeTab === "svg-to-png" && svgDimensions.width > 0 && (
                            <p className="text-sm text-gray-500">
                              Dimensions: {svgDimensions.width} × {svgDimensions.height} px
                            </p>
                          )}
                        </div>

                        {activeTab === "svg-to-png" && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Scale Factor</h3>
                              <div className="flex items-center gap-4 mb-2">
                                <Slider
                                  value={[scaleOption]}
                                  min={1}
                                  max={64}
                                  step={1}
                                  onValueChange={handleScaleChange}
                                  className="flex-1"
                                />
                                <span className="font-medium text-blue-600 min-w-[40px] text-right">
                                  {scaleOption}x
                                </span>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {scaleOptions.map((option) => (
                                  <Button
                                    key={option}
                                    variant={scaleOption === option ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                      setScaleOption(option)
                                      updateOutputDimensions(svgDimensions.width, svgDimensions.height, option)
                                    }}
                                    className={cn(
                                      "h-8 px-2",
                                      scaleOption === option && "bg-blue-600 hover:bg-blue-700",
                                    )}
                                  >
                                    {option}x
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium mb-2">Custom Dimensions</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="width">Width (px)</Label>
                                  <Input
                                    id="width"
                                    type="number"
                                    value={customWidth}
                                    onChange={handleCustomWidthChange}
                                    min={1}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="height">Height (px)</Label>
                                  <Input
                                    id="height"
                                    type="number"
                                    value={customHeight}
                                    onChange={handleCustomHeightChange}
                                    min={1}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium mb-2">Output Dimensions</h3>
                              <p className="text-sm text-gray-500">
                                {outputDimensions.width} × {outputDimensions.height} px
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetConversion}>
                        Cancel
                      </Button>
                      <Button onClick={convertImage} disabled={isConverting} className="bg-blue-600 hover:bg-blue-700">
                        {isConverting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <FileImage className="mr-2 h-4 w-4" />
                            Convert to {activeTab === "png-to-jpg" ? "JPG" : "PNG"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <ConversionProcess isComplete={true} />

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 border rounded-lg p-4 flex items-center justify-center bg-gray-50">
                        <img
                          src={convertedImage || "/placeholder.svg"}
                          alt="Converted"
                          className="max-w-full max-h-[300px] object-contain"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Conversion Complete</h3>
                          <p className="text-sm text-gray-500">
                            Your image has been successfully converted to {activeTab === "png-to-jpg" ? "JPG" : "PNG"}{" "}
                            format.
                          </p>
                          {activeTab === "svg-to-png" && (
                            <p className="text-sm text-gray-500 mt-2">
                              Output dimensions: {customWidth} × {customHeight} px
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button onClick={downloadImage} className="bg-blue-600 hover:bg-blue-700">
                            <Download className="mr-2 h-4 w-4" />
                            Download Image
                          </Button>
                          <Button variant="outline" onClick={resetConversion}>
                            Convert Another Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hidden canvas for image processing */}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6 mt-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold text-blue-600">
            <Repeat className="h-5 w-5" />
            <span>PixelSwitch</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} PixelSwitch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
