"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart3, CheckCircle, CheckCircle2, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import Hotjar from "@hotjar/browser"
import { Typewriter } from "react-simple-typewriter"

// ✅ Redesigned LoadingScreen Component
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.floor(Math.random() * 8) + 3
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const getStatus = () => {
    if (progress < 30) return "Scanning website structure..."
    if (progress < 70) return "Analyzing trust signals..."
    if (progress < 90) return "Generating trust score..."
    return "Finalizing..."
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 text-center animate-fade-in">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center relative mb-4">
            <Shield className="w-10 h-10 text-purple-600 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Analyzing Your Website</h3>
          <p className="text-gray-600 text-sm">{getStatus()}</p>
        </div>

        <div className="w-full bg-purple-100 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-purple-600 h-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mb-4">{progress}% Complete</p>

        <div className="text-xs text-purple-700 bg-purple-50 p-2 rounded-md">
          <span className="font-semibold">Tip:</span> This analysis typically takes 30-60 seconds
        </div>
      </div>
    </div>
  )
}

export default function AITrustScorePage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ website: "" })
  const [showThankYou, setShowThankYou] = useState(false)
  const [showSampleReport, setShowSampleReport] = useState(false)

  useEffect(() => {
    Hotjar.init(6475273, 6)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setShowThankYou(false)

    const cleanedURL = `https://${formData.website.replace(/^https?:\/\//, "")}`

    try {
      const res = await fetch("https://ai.brainito.com/api/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: cleanedURL }),
      })

      const data = await res.json()

      if (data.result) {
        const encodedBreakdown = encodeURIComponent(JSON.stringify(data.breakdown || []))
        const encodedSummary = encodeURIComponent(data.summary || "")
        const encodedStrengths = encodeURIComponent(JSON.stringify(data.key_strengths || []))
        const encodedImprovements = encodeURIComponent(JSON.stringify(data.areas_for_improvement || []))

        const resultUrl = `/ai-trustscore/result?` +
          `analysis_id=${data.analysis_id}&` +
          `score=${data.score}&` +
          `breakdown=${encodedBreakdown}&` +
          `summary=${encodedSummary}&` +
          `strengths=${encodedStrengths}&` +
          `improvements=${encodedImprovements}&` +
          `ai_visibility_score=${data.ai_visibility_score || 7.0}&` +
          `ai_visibility_notes=${encodeURIComponent(data.ai_visibility_notes || "")}`

        router.push(resultUrl)
      } else {
        alert("Something went wrong.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Server error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const scoreMetrics = [
    { name: "Legitimacy", score: 8.5, color: "from-purple-500 to-purple-600" },
    { name: "Transparency", score: 7.2, color: "from-orange-400 to-orange-500" },
    { name: "Customer Feedback", score: 6.8, color: "from-purple-400 to-orange-400" },
    { name: "Service Quality", score: 8.1, color: "from-purple-500 to-purple-600" },
    { name: "Responsiveness", score: 7.9, color: "from-orange-400 to-orange-500" },
    { name: "Refund Policies", score: 6.5, color: "from-purple-400 to-orange-400" },
    { name: "Website Credibility", score: 8.7, color: "from-purple-500 to-purple-600" },
    { name: "Trusted Platforms", score: 9.1, color: "from-purple-600 to-purple-800" },
  ]

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full bg-white/10 backdrop-blur-sm border-purple-600/30 shadow-2xl shadow-orange-500/20">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full mb-6 shadow-lg shadow-green-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
              <p className="text-xl text-purple-200 leading-relaxed">
                We'll analyze your digital presence and send your report within 24 hours
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-purple-400/20">
              <p className="text-white whitespace-pre-wrap text-left text-sm mt-4">
                <strong>AI Analysis:</strong><br />
                {result}
              </p>
            </div>
            <Button
              onClick={() => setShowThankYou(false)}
              className="mt-8 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold py-3 px-8 shadow-lg"
            >
              Back to Form
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h bg-white flex flex-col">
      {loading && <LoadingScreen />}
    <div className="flex-1">
      <div className="container mx-auto px-4 py-5 min-h-[40vh]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 mb-4 animate-bounce">
              <BarChart3 className="w-6 h-6 text-gray" />
              <h1 className="text-gray-800 text-xl">AI Visibility Report</h1>
            </div>
            <CardTitle className="text-gray text-center">
              <Typewriter
                words={[
                  "People don't ask Google.",
                  "They ask AI.. ",
                  "Wanna see what it thinks?",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </CardTitle>
          </div>

          <Card className="border border-purple-400/30 shadow-xl rounded-2xl shadow-purple-300">
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="website" className="text-black font-medium mb-1 block">Website URL</Label>
                  <div className="flex rounded-lg overflow-hidden shadow-sm border border-purple-300 bg-white">
                    <span className="px-4 flex items-center text-gray-600 bg-white-100 border-r border-purple-300">https://</span>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      placeholder="yourdomain.com"
                      value={formData.website.replace(/^https?:\/\//, "")}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full p-4 text-gray-800 focus:outline-none bg-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-semibold py-4 px-8 text-lg shadow-md transform transition-all duration-200 ease-out rounded-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    "Get AI Trustscore"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>

      {/* Sample Report Preview Section with Collapsible Design */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Collapsible Header */}
            <div className="text-center mb-6">
              <button
                onClick={() => setShowSampleReport(!showSampleReport)}
                className="group inline-flex items-center gap-2 bg-white hover:bg-purple-50 transition-all duration-300 rounded-lg px-4 py-2 shadow-md border border-purple-200 hover:border-purple-300"
              >
                <h2 className="text-lg font-semibold text-gray-900">Sample Report Preview</h2>
                <div className={`transform transition-transform duration-300 ${showSampleReport ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4 text-purple-600 group-hover:text-purple-700" />
                </div>
              </button>
              <p className="text-gray-600 text-sm mt-2">Click to see what your AI TrustScore report will look like</p>
            </div>

            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showSampleReport 
                ? 'max-h-[2000px] opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-4'
            }`}>
              <div className="space-y-8 pb-8">
                <Card className="shadow-2xl shadow-purple-500/20 border-purple-200/50 bg-gradient-to-br from-white to-purple-50/30 transform transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full text-3xl font-bold mb-4 shadow-lg shadow-purple-500/30">7.5</div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <h3 className="text-xl font-bold">AI TrustScore: 7.5 / 10</h3>
                      </div>
                      <p className="text-gray-600">Comprehensive analysis of your digital trustworthiness</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg mb-4">Score Breakdown</h4>
                      {scoreMetrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{metric.name}</span>
                            <span className="text-sm font-semibold">{metric.score}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-500 ease-out`}
                              style={{ width: `${metric.score * 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center"><h2>What's Included in Your Report</h2></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-semibold">Detailed Score Analysis</h4>
                            <p className="text-sm text-gray-600">In-depth breakdown of all 8 trust categories</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-semibold">Competitive Benchmarking</h4>
                            <p className="text-sm text-gray-600">See how you compare to industry standards</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-semibold">Actionable Recommendations</h4>
                            <p className="text-sm text-gray-600">Specific steps to improve your scores</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-semibold">Implementation Timeline</h4>
                            <p className="text-sm text-gray-600">Priority roadmap for trust improvements</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4"></div>
      <div className="pt-4"></div>

      <footer className="bg-purple-900 py-4 px-4 mt-auto pt-4 mt-4">
        <div className="container mx-auto text-center">
          <p className="text-purple-200 text-sm sm:text-base mb-2">
            Get insights into your digital trustworthiness and AI visibility
          </p>
          <p className="text-purple-300 text-xs sm:text-sm">
            Copyright by{" "}
            <Link 
              href="https://www.brainito.com/" 
              className="hover:text-purple-100 transition-colors underline"
            >
              Brainito.com
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
