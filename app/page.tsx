"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart3, CheckCircle, CheckCircle2 } from "lucide-react"
import Hotjar from "@hotjar/browser"

export default function AITrustScorePage() {
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
  })
  const [showThankYou, setShowThankYou] = useState(false)

  // Initialize Hotjar
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show thank you message first
    setShowThankYou(true)

    // Send email after a short delay
    setTimeout(() => {
      const emailBody = `Name: ${formData.name}%0D%0AWebsite: ${formData.website}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}`
      window.location.href = `mailto:accounts@brainito.com?subject=AI TrustScore Report Request&body=${emailBody}`
    }, 1500)
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
              <p className="text-purple-200 text-sm">
                Your AI TrustScore report will be delivered to{" "}
                <span className="text-white font-semibold">{formData.email}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
              <span className="text-white font-medium">Free Report</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Your Free AI TrustScore Report</h1>
            <p className="text-purple-200 text-lg">
              Enter your details below and receive a comprehensive analysis within 24 hours
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-purple-600/30 shadow-2xl shadow-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white text-center">Get Your AI TrustScore Report</CardTitle>
              <p className="text-purple-200 text-center text-sm">
                Receive a comprehensive analysis of your AI trustworthiness and visibility
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/20 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="website" className="text-white">
                    Website URL
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    required
                    className="bg-white/20 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/20 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-white/20 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-orange-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 active:from-orange-700 active:via-orange-800 active:to-orange-900 text-white font-semibold py-4 px-8 text-lg shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out border-0 rounded-lg"
                >
                  Get my AI Trustscore Reports
                </Button>

                <p className="text-xs text-purple-200 text-center">
                  We'll analyze your digital presence and send your report within 24 hours
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sample Report Preview */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sample Report Preview</h2>
              <p className="text-gray-600">Here's what your AI TrustScore report will look like</p>
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

            {/* What's Included Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">What's Included in Your Report</CardTitle>
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

      {/* Footer */}
      <footer className="bg-purple-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">Get insights into your digital trustworthiness and AI visibility</p>
          <p className="text-purple-300 text-sm mt-2">Copyright by Brainito.com</p>
        </div>
      </footer>
    </div>
  )
}
