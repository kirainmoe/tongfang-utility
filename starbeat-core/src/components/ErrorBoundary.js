import React from 'react';
import { Modal } from 'antd';
import str from '../resource/string';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: props.error !== undefined };

    if (props.error) {
      Modal.error({
        title: str('errorOccurred'),
        content: (
          <div>
            <p>{str('errorOccurredDescription')}</p>
            <p>Detail: {String(props.error)}</p>
          </div>
        ),
        onOk() {},
      });
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Modal.error({
      title: str('errorOccurred'),
      content: (
        <div>
          <p>{str('errorOccurredDescription')}</p>
          <p>Detail: {error} - {errorInfo}</p>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}