// ErrorBoundary.js
// ErrorBoundary.js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Replace the h2 tag with Text component
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>Something went wrong.</Text>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
