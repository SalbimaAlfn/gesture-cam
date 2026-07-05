class GestureManager {
  constructor() {
    this.currentGesture = "none";
    this.lastGesture = "none";
    this.lastChangeTime = 0;

    // Time (ms) before accepting a new gesture
    this.HOLD_TIME = 250;
  }

  update(newGesture) {
    const now = performance.now();

    // Same gesture detected continuously
    if (newGesture === this.lastGesture) {
      if (
        now - this.lastChangeTime >= this.HOLD_TIME
      ) {
        this.currentGesture = newGesture;
      }
    } else {
      // New gesture detected
      this.lastGesture = newGesture;
      this.lastChangeTime = now;
    }

    return this.currentGesture;
  }

  getGesture() {
    return this.currentGesture;
  }

  reset() {
    this.currentGesture = "none";
    this.lastGesture = "none";
    this.lastChangeTime = 0;
  }
}

// Export a single shared instance
const gestureManager = new GestureManager();

export default gestureManager;