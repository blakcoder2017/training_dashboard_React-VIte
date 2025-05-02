import React from "react";

const LoadingSpinner = () => {
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3 animate-bounce">Loading, please wait...</h5>
        </div>
      </div>
    )
}

export default LoadingSpinner;