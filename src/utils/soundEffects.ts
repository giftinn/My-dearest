export class SoundEffects {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  pop() {
    this.playTone(800, 0.1, 'sine');
    setTimeout(() => this.playTone(1000, 0.05, 'sine'), 50);
  }

  ding() {
    this.playTone(1200, 0.15, 'sine');
    setTimeout(() => this.playTone(1600, 0.1, 'sine'), 75);
  }

  boop() {
    this.playTone(400, 0.1, 'square');
  }

  cheer() {
    this.playTone(523, 0.1, 'sine'); // C
    setTimeout(() => this.playTone(659, 0.1, 'sine'), 100); // E
    setTimeout(() => this.playTone(784, 0.15, 'sine'), 200); // G
    setTimeout(() => this.playTone(1047, 0.2, 'sine'), 350); // High C
  }
}

export const soundEffects = new SoundEffects();