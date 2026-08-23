import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ARZAEL boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-petrol-950 border border-petrol-800/60 m-6">
          <p className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3">
            [ SYSTEM FRACTURE ]
          </p>
          <h2 className="text-2xl font-serif text-text-primary mb-3">
            Something broke in the quiet.
          </h2>
          <p className="text-sm text-text-muted max-w-md mb-6 leading-relaxed">
            I don’t know what you were looking for, but the connection slipped. No data was lost.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-petrol-900 border border-petrol-500/40 text-xs font-mono tracking-widest-artist uppercase text-petrol-200 hover:bg-petrol-800 hover:text-white"
          >
            TRY AGAIN
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
