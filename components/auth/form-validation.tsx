"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"

interface ValidationRule {
  required?: boolean
  minLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean
}

interface FormValidationProps {
  value: string
  rules: ValidationRule
  onValidationChange: (isValid: boolean) => void
}

export function FormValidation({ value, rules, onValidationChange }: FormValidationProps) {
  const [validationResults, setValidationResults] = useState<Array<{ rule: string; valid: boolean; message: string }>>(
    [],
  )

  useEffect(() => {
    const results = []

    if (rules.required) {
      results.push({
        rule: "required",
        valid: value.length > 0,
        message: "This field is required",
      })
    }

    if (rules.minLength) {
      results.push({
        rule: "minLength",
        valid: value.length >= rules.minLength,
        message: `Must be at least ${rules.minLength} characters`,
      })
    }

    if (rules.pattern) {
      results.push({
        rule: "pattern",
        valid: rules.pattern.test(value),
        message: "Invalid format",
      })
    }

    if (rules.custom) {
      results.push({
        rule: "custom",
        valid: rules.custom(value),
        message: "Custom validation failed",
      })
    }

    setValidationResults(results)
    const isValid = results.every((result) => result.valid)
    onValidationChange(isValid)
  }, [value, rules, onValidationChange])

  if (value.length === 0) return null

  return (
    <div className="space-y-1">
      {validationResults.map((result, index) => (
        <div
          key={result.rule}
          className={`flex items-center gap-2 text-xs transition-all duration-300 ${
            result.valid ? "text-green-600" : "text-red-600"
          }`}
        >
          {result.valid ? (
            <Check className="h-3 w-3 animate-in zoom-in-50 duration-200" />
          ) : (
            <X className="h-3 w-3 animate-in zoom-in-50 duration-200" />
          )}
          <span className={result.valid ? "validation-success" : "validation-error"}>{result.message}</span>
        </div>
      ))}
    </div>
  )
}
