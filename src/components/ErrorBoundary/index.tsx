import React, { useCallback, useMemo } from 'react';
import * as Sentry from "@sentry/react";

interface ErrorBoundaryProps {
    children : React.ReactNode;
}

function ErrorBoundary ({children} : ErrorBoundaryProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const beforeCapture = (scope: Sentry.Scope, error: Error) => {
        // HJ TODO: capture 전 무언가   
    }

    const fallback = useCallback(() => <>{children}</>, [children])

    const sentryProps = useMemo(() => ({
        beforeCapture,
        fallback
    }), [fallback])

    return <Sentry.ErrorBoundary {...sentryProps}>{children}</Sentry.ErrorBoundary>
}

export default ErrorBoundary;