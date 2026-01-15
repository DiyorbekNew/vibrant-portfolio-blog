import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from './Layout';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Layout>
          <div className="container py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Xatolik yuz berdi</h1>
              <p className="text-muted-foreground mb-6">
                Kechirasiz, ilovada kutilmagan xatolik yuz berdi. Iltimos, sahifani yangilab ko'ring yoki keyinroq qayta urinib ko'ring.
              </p>
              {this.state.error && process.env.NODE_ENV === 'development' && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-left">
                  <p className="text-sm font-mono text-destructive">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <Button onClick={this.handleReset} variant="default">
                  Qayta Urinib Ko'rish
                </Button>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                  Bosh Sahifaga Qaytish
                </Button>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

