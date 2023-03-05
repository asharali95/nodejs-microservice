class CircuitBreaker {
    constructor(request) {
      this.request = request;
      this.failureThreshold = 3;
      this.failureTimeout = 10000;
      this.requestTimeout = 5000;
      this.circuitState = 'CLOSED';
      this.failureCount = 0;
      this.lastFailureTime = null;
    }
  
    async exec(url, options) {
      return new Promise((resolve, reject) => {
        if (this.circuitState === 'OPEN') {
          const now = Date.now();
          const timeSinceLastFailure = now - this.lastFailureTime;
          if (timeSinceLastFailure >= this.failureTimeout) {
            this.circuitState = 'HALF_OPEN';
          } else {
            return reject(new Error('Circuit is currently open'));
          }
        }
        const timeout = setTimeout(() => {
          this.failureCount++;
          if (this.failureCount >= this.failureThreshold) {
            this.circuitState = 'OPEN';
            this.lastFailureTime = Date.now();
          }
          reject(new Error('Request timed out'));
        }, this.requestTimeout);
  
        this.request(url, options)
          .then((response) => {
            clearTimeout(timeout);
            if (this.circuitState === 'HALF_OPEN') {
              this.circuitState = 'CLOSED';
              this.failureCount = 0;
            }
            resolve(response);
          })
          .catch((error) => {
            clearTimeout(timeout);
            this.failureCount++;
            if (this.failureCount >= this.failureThreshold) {
              this.circuitState = 'OPEN';
              this.lastFailureTime = Date.now();
            }
            reject(error);
          });
      });
    }
  }
  
  module.exports = CircuitBreaker;
  