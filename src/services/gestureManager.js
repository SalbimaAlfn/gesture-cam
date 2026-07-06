class GestureManager {
  constructor() {
    this.currentGesture = "none";
    this.lastGesture = "none";
    this.lastChangeTime = 0;
    this.HOLD_TIME = 240;
  }

  update(newGesture) {
    const now = performance.now();

    if (newGesture === "none") {
      this.currentGesture = "none";
      this.lastGesture = "none";
      this.lastChangeTime = now;
      return this.currentGesture;
    }

    if (newGesture !== this.currentGesture) {
      this.currentGesture = newGesture;
      this.lastGesture = newGesture;
      this.lastChangeTime = now;
      return this.currentGesture;
    }

    if (now - this.lastChangeTime >= this.HOLD_TIME) {
      this.currentGesture = newGesture;
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

const gestureManager = new GestureManager();

export default gestureManager;