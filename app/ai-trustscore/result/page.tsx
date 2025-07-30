"use client"
import { useSearchParams } from "next/navigation"
import { Shield, CheckCircle, TrendingUp, AlertTriangle, Eye, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ResultPage() {
  const params = useSearchParams()
  const analysisId = params.get("analysis_id")
  const score = params.get("score") || "7.5"
  const breakdownRaw = params.get("breakdown")
  const summary = params.get("summary") || ""
  const strengthsRaw = params.get("strengths")
  const improvementsRaw = params.get("improvements")
  const aiVisibilityScore = params.get("ai_visibility_score") || "7.0"
  const aiVisibilityNotes = params.get("ai_visibility_notes") || ""
  
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const breakdown = breakdownRaw
    ? JSON.parse(decodeURIComponent(breakdownRaw))
    : [
        { name: "Legitimacy", score: 8.5 },
        { name: "Transparency", score: 7.2 },
        { name: "Customer Feedback", score: 6.8 },
        { name: "Service Quality", score: 8.1 },
        { name: "Responsiveness", score: 7.9 },
        { name: "Refund Policies", score: 6.5 },
        { name: "Website Credibility", score: 8.7 },
        { name: "Trusted Platforms", score: 9.1 },
      ]

  const keyStrengths = strengthsRaw 
    ? JSON.parse(decodeURIComponent(strengthsRaw))
    : ["Strong online presence", "Good customer engagement", "Professional website design"]

  const areasForImprovement = improvementsRaw
    ? JSON.parse(decodeURIComponent(improvementsRaw))
    : ["Improve customer review visibility", "Enhance transparency", "Strengthen refund policies"]

  const getScoreColor = (score) => {
    if (score >= 8) return "from-green-500 to-green-600"
    if (score >= 6) return "from-orange-400 to-orange-500"
    return "from-red-400 to-red-500"
  }

  const getScoreText = (score) => {
    if (score >= 8) return "Excellent"
    if (score >= 6) return "Good"
    return "Needs Improvement"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!analysisId) {
      alert("Analysis ID is missing. Please try again.")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("https://ai-report-backend-vdvj.onrender.com/api/request-report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analysis_id: analysisId,
          name: formData.name,
          email: formData.email,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "" })
      } else {
        alert(data.error || "Failed to submit request. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Score Card */}
        <Card className="mb-8 shadow-2xl shadow-purple-500/20 border-purple-200/50 bg-gradient-to-br from-white to-purple-50/30">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${getScoreColor(parseFloat(score))} text-white rounded-full text-3xl font-bold mb-4 shadow-lg`}>
                {score}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-bold">AI TrustScore: {score} / 10</h3>
              </div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                {getScoreText(parseFloat(score))}
              </div>
              {summary && (
                <p className="text-gray-600 max-w-2xl mx-auto">{summary}</p>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-4">Score Breakdown</h4>
              {breakdown.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.name}</span>
                    <span className="text-sm font-semibold">{metric.score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getScoreColor(metric.score)} transition-all duration-500 ease-out`}
                      style={{ width: `${metric.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Visibility Score */}
        <Card className="mb-8 shadow-lg border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">AI Visibility Score</h3>
                  <p className="text-sm text-gray-600">How well AI systems can understand your website</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{aiVisibilityScore}/10</div>
                <div className="text-sm text-gray-600">{getScoreText(parseFloat(aiVisibilityScore))}</div>
              </div>
            </div>
            {aiVisibilityNotes && (
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{aiVisibilityNotes}</p>
            )}
          </CardContent>
        </Card>

        {/* Want a detailed report form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {submitSuccess ? "Request Submitted!" : "Want a Detailed Report?"}
            </CardTitle>
            <p className="text-center text-gray-600">
              {submitSuccess 
                ? "We'll send you a comprehensive analysis within 24 hours"
                : "Get personalized recommendations and implementation strategies"
              }
            </p>
          </CardHeader>
          <CardContent>
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600 mb-4">
                  Your detailed report request has been submitted successfully.
                </p>
                <Button 
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="md:col-span-2 mt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get Detailed Report"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}