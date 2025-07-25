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

  // Hotjar init
  useEffect(() => {
    Hotjar.init(6475273, 6)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = document.createElement("form")
    form.action = "https://formsubmit.co/accounts@brainito.com"
    form.method = "POST"
    form.style.display = "none"

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    // Prevent redirect
    const redirect = document.createElement("input")
    redirect.name = "_next"
    redirect.value = "about:blank"
    form.appendChild(redirect)

    // Disable CAPTCHA
    const captcha = document.createElement("input")
    captcha.name = "_captcha"
    captcha.value = "false"
    form.appendChild(captcha)

    // Submit form
    document.body.appendChild(form)
    form.submit()

    // Show thank-you screen
    setShowThankYou(true)

    // Auto-reset after 5 seconds
    setTimeout(() => {
      setShowThankYou(false)
      setFormData({ name: "", website: "", email: "", phone: "" })
    }, 5000)
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
              <span className="text-white font-medium">Free Report</span>
            </div>
            <CardTitle className="text-white text-center">Get Your AI TrustScore Report</CardTitle>
            <p className="text-purple-200 text-lg">
              Enter your details below and receive a comprehensive analysis within 24 hours
            </p>
          </div>
          <Card className="bg-white/10 backdrop-blur-sm border-purple-600/30 shadow-2xl shadow-orange-500/20">
            <CardHeader>
              <p className="text-purple-200 text-center text-sm">
                Receive a comprehensive analysis of your AI trustworthiness and visibility
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
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
                  <Label htmlFor="website" className="text-white">Website URL</Label>
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
                  <Label htmlFor="email" className="text-white">Email Address</Label>
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
    </div>
  )
}
