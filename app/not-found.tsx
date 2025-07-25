import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <Link href="/">
          <Button variant="link" className="text-blue-600 hover:text-blue-800 text-lg">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
