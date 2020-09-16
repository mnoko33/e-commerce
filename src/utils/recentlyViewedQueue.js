function recentlyViewedQueue(MAX_SIZE = 3) {
  this.Q = [];
  return {
    push: v => {
      const idx = this.Q.indexOf(v);
      if (idx > 0) {
        this.Q.splice(idx, 1);
        this.Q.push(v);
        return
      }
      if (this.Q.length >= MAX_SIZE) {
        this.Q.shift();
      }
      this.Q.push(v)
    },
    getQ: () => {
      return this.Q
    }
  }
}

export default recentlyViewedQueue;