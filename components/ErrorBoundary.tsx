'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Avoid logging complex objects that might have circular references
    console.error('Uncaught error:', error.message);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = this.state.error?.message || 'An unexpected error occurred.';
      let isFirestoreError = false;
      let firestoreDetails = null;

      try {
        const parsed = JSON.parse(errorMessage);
        if (parsed.operationType && parsed.path) {
          isFirestoreError = true;
          firestoreDetails = parsed;
          errorMessage = parsed.error;
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h1 className="text-2xl font-bold">Something went wrong</h1>
            </div>
            
            <div className="bg-red-50 text-red-900 p-4 rounded-lg mb-6 font-mono text-sm break-words">
              {errorMessage}
            </div>

            {isFirestoreError && firestoreDetails && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2">Database Error Details</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><span className="font-medium">Operation:</span> {firestoreDetails.operationType}</li>
                  <li><span className="font-medium">Path:</span> {firestoreDetails.path}</li>
                  <li><span className="font-medium">User ID:</span> {firestoreDetails.authInfo?.userId || 'Not logged in'}</li>
                </ul>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
