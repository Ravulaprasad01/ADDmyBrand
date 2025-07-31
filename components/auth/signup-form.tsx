"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { FormValidation } from "./form-validation"
import { PulseButton } from "./pulse-button"

interface SignupFormProps {
  onToggleMode: () => void
}

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showValidation, setShowValidation] = useState(false)
  const [validationStates, setValidationStates] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  })

  const { signUp } = useAuth()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowValidation(true)

    if (!validationStates.email || !validationStates.password || !validationStates.confirmPassword || !acceptTerms) {
      setError("Please fix all validation errors and accept the terms")
      return
    }

    setLoading(true)
    setError("")

    const { error } = await signUp(formData.email, formData.password, {
      firstName: formData.firstName,
      lastName: formData.lastName,
    })

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md bg-white shadow-xl border-0 animate-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Create Account</CardTitle>
          <p className="text-gray-600">Join thousands of marketers growing their business</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  className="h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@company.com"
                className="h-11"
                required
              />
              {showValidation && (
                <FormValidation
                  value={formData.email}
                  rules={{
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  }}
                  onValidationChange={(valid) => setValidationStates((prev) => ({ ...prev, email: valid }))}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a strong password"
                className="h-11"
                required
              />
              {showValidation && (
                <FormValidation
                  value={formData.password}
                  rules={{
                    required: true,
                    minLength: 8,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  }}
                  onValidationChange={(valid) => setValidationStates((prev) => ({ ...prev, password: valid }))}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                className="h-11"
                required
              />
              {showValidation && (
                <FormValidation
                  value={formData.confirmPassword}
                  rules={{
                    required: true,
                    custom: (value) => value === formData.password,
                  }}
                  onValidationChange={(valid) => setValidationStates((prev) => ({ ...prev, confirmPassword: valid }))}
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Privacy Policy
                </Button>
              </Label>
            </div>

            <PulseButton
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </PulseButton>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Button variant="link" onClick={onToggleMode} className="p-0 h-auto text-blue-600">
                Sign in
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
