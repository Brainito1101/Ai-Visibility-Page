"use client"
import { useSearchParams } from "next/navigation"
import { Shield, CheckCircle, TrendingUp, AlertTriangle, Eye, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useEffect, Suspense } from "react"

// Animated Score Component with Progress Bar
function AnimatedScoreWithBar({ targetScore, name, getScoreColor, duration = 6000 }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      const startTime = Date.now();
      
      const updateScore = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Very slow, smooth progression
        const easeInOutQuad = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        const newScore = easeInOutQuad * targetScore;
        setCurrentScore(newScore);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateScore);
        } else {
          // Animation completed - set final score and mark as completed
          setCurrentScore(targetScore);
          setIsCompleted(true);
        }
      };
      
      updateScore();
    };

    animate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [targetScore, duration]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{name}</span>
        <span className="text-sm font-semibold tabular-nums">
          {currentScore.toFixed(1)}/10
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getScoreColor(currentScore)} transition-none relative`}
          style={{ 
            width: `${currentScore * 10}%`,
            transition: 'none',
            // Add subtle shining effect when completed
            ...(isCompleted && {
              background: `linear-gradient(90deg, 
                ${getScoreColor(currentScore).includes('green') ? '#10b981, #059669' : 
                  getScoreColor(currentScore).includes('orange') ? '#f59e0b, #d97706' : 
                  '#ef4444, #dc2626'}, 
                 
                ${getScoreColor(currentScore).includes('green') ? '#10b981, #059669' : 
                  getScoreColor(currentScore).includes('orange') ? '#f59e0b, #d97706' : 
                  '#ef4444, #dc2626'})`,
              backgroundSize: '300% 100%',
              animation: 'subtleShine 15s ease-in-out infinite'
            })
          }}
        />
      </div>
      
      {/* Add CSS animation for subtle shining effect */}
      <style jsx>{`
        @keyframes subtleShine {
          0% {
            background-position: -300% 0;
          }
          50% {
            background-position: 300% 0;
          }
          100% {
            background-position: -300% 0;
          }
        }
      `}</style>
    </div>
  );
}

// Loading component for Suspense
function LoadingSpinner() {
  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Loading your results...</span>
        </div>
      </div>
    </div>
  )
}

// Main component that uses useSearchParams
function ResultContent() {
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
                <AnimatedScoreWithBar
                  key={index}
                  name={metric.name}
                  targetScore={metric.score}
                  getScoreColor={getScoreColor}
                  duration={6000}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What's Included Section */}
        <Card className="mb-8">
  <CardHeader>
    <CardTitle className="text-center"><h2>What's Included in Your Report</h2></CardTitle>
  </CardHeader>
  <CardContent>
    <div 
    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
    style={{ fontSize: "0.95rem" }}  // Slightly smaller text
  >
    <div style={{ flex: 1 }}>
      <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Detailed Score Analysis</h4>
      <p style={{ color: "#4B5563", fontSize: "0.85rem" }}>
        In-depth breakdown of all 8 trust categories
      </p>
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Actionable Recommendations</h4>
      <p style={{ color: "#4B5563", fontSize: "0.85rem" }}>
        Specific steps to improve your scores
      </p>
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Implementation Timeline</h4>
      <p style={{ color: "#4B5563", fontSize: "0.85rem" }}>
        Priority roadmap for trust improvements
      </p>
    </div>
  </div>

    {/* Form moved here */}
    {!submitSuccess ? (
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
    ) : (
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
    )}
  </CardContent>
</Card>


        
      </div>
    </div>
  )
}

// Main exported component with Suspense wrapper
export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResultContent />
    </Suspense>
  )
}
