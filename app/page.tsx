"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart3, CheckCircle, CheckCircle2, Router, Loader2 } from "lucide-react"
import Hotjar from "@hotjar/browser"
import { Typewriter } from 'react-simple-typewriter'

// Loading Screen Component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 text-center">
      <div className="mb-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute"></div>
          <Shield className="w-6 h-6 text-purple-600 absolute" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Website</h3>
      <p className="text-gray-600 mb-4">AI is evaluating your digital trustworthiness...</p>
      
      <div className="space-y-3 text-left">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-700">Scanning website structure</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <span className="text-sm text-gray-700">Analyzing trust signals</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-700"></div>
          <span className="text-sm text-gray-700">Generating trust score</span>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-purple-50 rounded-lg">
        <p className="text-xs text-purple-700">
          <span className="font-semibold">Tip:</span> This analysis typically takes 30-60 seconds
        </p>
      </div>
    </div>
  </div>
)

export default function AITrustScorePage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    website: "",
  })
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    const siteId = 6475273
    const hotjarVersion = 6
    Hotjar.init(siteId, hotjarVersion)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setShowThankYou(false)

    const cleanedURL = `https://${formData.website.replace(/^https?:\/\//, "")}`

    try {
      const res = await fetch("https://ai-report-backend-vdvj.onrender.com/api/analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
              className="mt-8 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-8 shadow-lg shadow-orange-500/30"
            >
              Back to Form
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {loading && <LoadingScreen />}
      
      <div className="container mx-auto px-4 py-5 min-h-[40vh]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 animate-bounce">
                <BarChart3 className="w-6 h-6 text-gray" />
                <h1 className="text-gray-800 text-xl">Ai Visibility Report</h1>
              </div>
            </div>
            <CardTitle className="text-gray text-center">
              <Typewriter
                words={[
                  'People don\'t ask Google.',
                  'They ask AI.. ',
                  'Wanna see what it thinks?',
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
                  <Label htmlFor="website" className="text-black font-medium mb-1 block">
                    Website URL
                  </Label>
                  <div className="flex rounded-lg overflow-hidden shadow-sm border border-purple-300 bg-white">
                    <span className="px-4 flex items-center text-gray-600 bg-white-100 border-r border-purple-300">
                      https://
                    </span>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      placeholder="yourdomain.com"
                      value={formData.website.replace(/^https?:\/\//, "")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          website: e.target.value.replace(/^https?:\/\//, ""),
                        })
                      }
                      required
                      disabled={loading}
                      className="w-full p-4 text-gray-800 focus:outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 text-lg shadow-md shadow-purple-400/40 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out rounded-lg disabled:transform-none disabled:shadow-none"
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

      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sample Report Preview</h2>
              <p className="text-gray-600 text-sm">Here's what your AI TrustScore report will look like</p>
            </div>

            <Card className="mb-8 shadow-2xl shadow-purple-500/20 border-purple-200/50 bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full text-3xl font-bold mb-4 shadow-lg shadow-purple-500/30">
                    7.5
                  </div>
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

      <footer className="bg-purple-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">Get insights into your digital trustworthiness and AI visibility</p>
          <p className="text-purple-300 text-sm mt-2">Copyright by <Link href="https://www.brainito.com/">Brainito.com</Link></p>
        </div>
      </footer>
    </div>
  )
}
