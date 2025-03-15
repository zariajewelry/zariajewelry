"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // Asegúrate de importar la función cn si la usas

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string // Añadida la prop className
}

// Mock suggestions data
const popularSearches = [
  "Collar de diamantes",
  "Anillos de compromiso",
  "Pulseras oro rosa",
  "Pendientes de plata",
  "Joyas para bodas",
  "Regalos especiales",
  "Colección Infinity",
]

export default function SearchBar({ 
  placeholder = "Buscar...", 
  value, 
  onChange, 
  className 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Filter suggestions based on current value
    if (value.length > 0) {
      const filteredSuggestions = popularSearches.filter((search) => search.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions(popularSearches)
    }
  }, [value])

  useEffect(() => {
    // Close suggestions on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleClear = () => {
    onChange("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setIsFocused(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          className={cn("pl-10 pr-10 rounded-full border-gray-200 focus:border-[#81D8D0] focus:ring-0 placeholder:text-gray-400", className)}
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full"
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        )}
      </div>

      {isFocused && suggestions.length > 0 && (
  <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-50 max-h-60 overflow-auto">
    <div className="p-3">
      <p className="text-xs text-gray-500 mb-2">Sugerencias populares</p>
      <ul className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center w-full p-2 text-sm text-left hover:bg-gray-50 rounded"
            >
              <Search className="h-3.5 w-3.5 mr-2 text-gray-400" />
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
    </div>
  )
}