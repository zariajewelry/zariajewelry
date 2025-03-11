"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const [cookieData, setCookieData] = useState<string>("Checking...");
  
  useEffect(() => {
    setCookieData(document.cookie);
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Status Checker</h1>
      
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="font-bold mb-2">Auth Status:</h2>
        <p className="text-green-700">Status: <span className="font-mono">{status}</span></p>
      </div>
      
      {status === "authenticated" && (
        <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
          <h2 className="font-bold mb-2 text-green-800">User Authenticated ✓</h2>
          <pre className="bg-white p-3 rounded overflow-x-auto text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
      
      {status === "unauthenticated" && (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
          <h2 className="font-bold mb-2 text-yellow-800">User Not Authenticated ⚠️</h2>
          <p>You are not currently logged in.</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Link 
            href="/auth/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Sign In
          </Link>
          
          <Link 
            href="/protected"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Protected Page
          </Link>
          
          <Link 
            href="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}