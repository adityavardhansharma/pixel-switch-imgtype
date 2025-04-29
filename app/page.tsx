import Link from "next/link"
import { ArrowRight, FileImage, FileUp, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Repeat className="h-6 w-6" />
            <span>PixelSwitch</span>
          </div>
          <nav className="flex items-center gap-4">
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
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 mb-4">
                Powerful Image Conversion
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                <span className="text-blue-600">PixelSwitch</span>: Image Format Converter
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Transform your images between formats with ease. SVG to PNG with custom scaling, JPG to PNG, PNG to JPG,
                and more.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/convert" className="gap-2">
                  Start Converting <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FileImage className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">SVG to PNG</h3>
                <p className="text-gray-500">
                  Convert SVG files to PNG with custom scaling options. Maintain quality at any size.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Repeat className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Format Conversion</h3>
                <p className="text-gray-500">
                  Easily convert between JPG, PNG, WebP and other formats with a single click.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FileUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Batch Processing</h3>
                <p className="text-gray-500">Convert multiple images at once. Fast, efficient, and hassle-free.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                How It <span className="text-blue-600">Works</span>
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Our conversion process is simple, fast, and secure. No data is stored on our servers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center p-6 order-1">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Select Format</h3>
                <p className="text-gray-500">Choose the conversion type you need for your image.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 order-2">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Upload</h3>
                <p className="text-gray-500">Drag and drop or select the image you want to convert.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 order-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Download</h3>
                <p className="text-gray-500">Get your converted image instantly with your preferred settings.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
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
