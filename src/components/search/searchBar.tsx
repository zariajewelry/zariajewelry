"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/common/useDebounce"

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  debounceDelay?: number
  autoFocus?: boolean
  showSuggestions?: boolean
  showSearchIcon?: boolean
  showClearButton?: boolean
  minimalStyle?: boolean
}

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
  placeholder, 
  value, 
  onChange, 
  className,
  debounceDelay = 300,
  autoFocus = false,
  showSuggestions = false,
  showSearchIcon = false,
  showClearButton = true,
  minimalStyle = true
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  
  // Estado interno para el debounce
  const [internalValue, setInternalValue] = useState(value)
  const debouncedValue = useDebounce(internalValue, debounceDelay)
  
  // Enfoque automático
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Actualizar sugerencias
  useEffect(() => {
    if (showSuggestions) {
      if (internalValue.length > 0) {
        const filteredSuggestions = popularSearches.filter((search) => 
          search.toLowerCase().includes(internalValue.toLowerCase())
        )
        setSuggestions(filteredSuggestions)
      } else {
        setSuggestions(popularSearches)
      }
    }
  }, [internalValue, showSuggestions])
  
  // Propagar cambios debounceados
  useEffect(() => {
    if (isTyping && debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value, isTyping])
  
  // Sincronizar con value externo
  useEffect(() => {
    if (!isTyping && value !== internalValue) {
      setInternalValue(value)
    }
  }, [value, internalValue, isTyping])
  
  // Manejar clics fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
        setIsTyping(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  const handleFocus = () => setIsFocused(true)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    setInternalValue(e.target.value)
  }
  
  const handleClear = () => {
    setInternalValue("")
    setIsTyping(false)
    onChange("")
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  
  const handleSuggestionClick = (suggestion: string) => {
    setInternalValue(suggestion)
    setIsTyping(false)
    onChange(suggestion)
    setIsFocused(false)
  }

  // Estilos del input: añadido caret-transparent para inputs vacíos
  const inputStyles = minimalStyle 
  ? `w-full bg-transparent border-none outline-none shadow-none focus:ring-0 focus:outline-none font-realtime px-0 py-1 pl-6 ${!internalValue ? 'caret-transparent' : ''}`
  : "rounded-full border-gray-200 focus:border-zaria focus:ring-0 text-base";

  const paddingClasses = () => {
    if (minimalStyle) return "px-0";
    let padding = "";
    padding += showSearchIcon ? "pl-10 " : "";
    padding += showClearButton ? "pr-10" : "";
    return padding;
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        {minimalStyle ? (
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsTyping(false), 100)}
            className={cn(inputStyles, paddingClasses(), className)}
          />
        ) : (
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsTyping(false), 100)}
            className={cn(inputStyles, paddingClasses(), className)}
          />
        )}
        
        {showSearchIcon && (
          <Search 
            className={cn(
              "h-4 w-4 absolute top-1/2 transform -translate-y-1/2 text-gray-400",
              minimalStyle ? "left-0" : "left-3"
            )} 
          />
        )}
        
        {showClearButton && internalValue && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 cursor-pointer", 
              minimalStyle ? "right-0" : "right-2"
            )}
            aria-label="Borrar búsqueda"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {showSuggestions && isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg border border-black z-50 max-h-60 overflow-auto">
          <div className="p-3">
            <p className="text-xs text-gray-500 mb-2">Sugerencias populares</p>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center w-full p-2 text-sm text-left hover:bg-black/5"
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