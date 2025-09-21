import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex  flex-col items-center mt-15 relative">
          <div className="absolute top-5 w-200 h-100 bg-purple-400/30 dark:bg-blue-900/30 blur-3xl rounded-full"></div>
          <img src="public/images/generated-image (1).webp" className="z-20 w-100" alt="" />
          <h5 className="text-2xl text-zinc-900 dark:text-white font-Dana font-bold">
            {" "}
            اوه! به نظر می‌رسه قهوه‌هامون قهر کردن! در حال بررسی مشکل هستیم
          </h5>
        </div>
      );
    }

    return this.props.children;
  }
}
