// Web Audio API procedural sound synthesis for authentic Bengali temple instruments & sacred melodies

class ProceduralAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeLoopStopper: (() => void) | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMasterVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public stopAll() {
    if (this.activeLoopStopper) {
      this.activeLoopStopper();
      this.activeLoopStopper = null;
    }
  }

  // 1. Play Dhak Strike ('dha' = open bass head, 'tak' = sharp rim, 'koor' = slap)
  public playDhakStrike(type: 'dha' | 'tak' | 'koor' | 'jham' = 'dha', timeOffset: number = 0) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const startTime = ctx.currentTime + timeOffset;

    if (type === 'dha') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, startTime);
      filter.frequency.exponentialRampToValueAtTime(110, startTime + 0.15);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, startTime);
      osc.frequency.exponentialRampToValueAtTime(58, startTime + 0.22);

      gain.gain.setValueAtTime(0.9, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    } else if (type === 'tak') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, startTime);
      osc.frequency.exponentialRampToValueAtTime(320, startTime + 0.04);

      const bufferSize = ctx.sampleRate * 0.04;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1400, startTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.7, startTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      gain.gain.setValueAtTime(0.6, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.07);
      whiteNoise.start(startTime);
      whiteNoise.stop(startTime + 0.07);
    } else if (type === 'koor') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, startTime);
      osc.frequency.exponentialRampToValueAtTime(90, startTime + 0.08);

      gain.gain.setValueAtTime(0.5, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.1);
    } else if (type === 'jham') {
      this.playTempleBell(startTime - ctx.currentTime);
      this.playDhakStrike('dha', startTime - ctx.currentTime);
    }
  }

  // 2. Play Temple Brass Bell (Kashor Ghanta)
  public playTempleBell(timeOffset: number = 0) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const startTime = ctx.currentTime + timeOffset;
    const freqs = [1568, 2093, 3136, 4186];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (idx % 2 ? 4 : -3), startTime);

      const decay = 0.8 + idx * 0.3;
      gain.gain.setValueAtTime(0.2 / (idx + 1), startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + decay + 0.05);
    });
  }

  // 3. Play Shankha (Divine Conch Shell Sound)
  public playShankha(durationSec: number = 3.5) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    subOsc.type = 'sine';

    const baseFreq = 420;
    osc.frequency.setValueAtTime(baseFreq * 0.8, startTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, startTime + 0.6);
    osc.frequency.setValueAtTime(baseFreq, startTime + durationSec - 0.7);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, startTime + durationSec);

    subOsc.frequency.setValueAtTime(baseFreq * 2, startTime);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(850, startTime);
    filter.Q.setValueAtTime(3.5, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.45, startTime + 0.5);
    gain.gain.setValueAtTime(0.45, startTime + durationSec - 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    subOsc.start(startTime);
    osc.stop(startTime + durationSec + 0.1);
    subOsc.stop(startTime + durationSec + 0.1);
  }

  // 4. Play Bamboo Flute Melody Note
  public playFluteNote(freq: number, duration: number = 0.8, timeOffset: number = 0) {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const startTime = ctx.currentTime + timeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.linearRampToValueAtTime(freq * 1.01, startTime + duration * 0.5);
    osc.frequency.linearRampToValueAtTime(freq, startTime + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.08);
    gain.gain.setValueAtTime(0.18, startTime + duration - 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // 5. Play Continuous Devotional Presets
  public playPreset(
    preset?: 'shankha' | 'dhak-fast' | 'dhak-dhaak' | 'temple-flute' | 'mantra-drone' | 'evening-aarti' | 'shiuli-morning'
  ): { stop: () => void } {
    this.stopAll();
    const ctx = this.getContext();
    if (!ctx) return { stop: () => {} };

    let isRunning = true;
    const intervals: number[] = [];

    if (preset === 'shankha') {
      this.playShankha(4);
      const id = window.setInterval(() => {
        if (!isRunning) return;
        this.playShankha(3.8);
        setTimeout(() => this.playTempleBell(), 2000);
      }, 5500);
      intervals.push(id);
    } else if (preset === 'dhak-fast' || preset === 'dhak-dhaak') {
      // Polyrhythmic Bengal Dhak Loop
      const pattern: ('dha' | 'tak' | 'koor' | 'jham')[] = [
        'dha', 'tak', 'dha', 'tak',
        'dha', 'dha', 'tak', 'jham',
        'dha', 'tak', 'koor', 'tak',
        'dha', 'dha', 'tak', 'jham',
      ];
      let step = 0;
      const bpm = preset === 'dhak-fast' ? 128 : 110;
      const stepDuration = (60 / bpm / 4) * 1000;

      const id = window.setInterval(() => {
        if (!isRunning) return;
        const hit = pattern[step % pattern.length];
        this.playDhakStrike(hit);
        step++;
      }, stepDuration);
      intervals.push(id);
    } else if (preset === 'temple-flute' || preset === 'shiuli-morning') {
      // Morning Raga Bhairav Melody
      const ragaNotes = [261.63, 277.18, 329.63, 349.23, 392.0, 415.3, 493.88, 523.25]; // C, Db, E, F, G, Ab, B, C
      const melodySeq = [0, 1, 2, 4, 3, 2, 1, 0, 4, 5, 4, 2, 1, 0];
      let step = 0;

      // Background Tanpura Drone
      const droneNotes = [130.81, 196.0, 261.63];
      const droneOscs = droneNotes.map((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        return { osc, gain };
      });

      const id = window.setInterval(() => {
        if (!isRunning) return;
        const noteIdx = melodySeq[step % melodySeq.length];
        this.playFluteNote(ragaNotes[noteIdx], 0.7);
        step++;
      }, 850);
      intervals.push(id);

      const stopper = () => {
        isRunning = false;
        intervals.forEach((i) => clearInterval(i));
        droneOscs.forEach((d) => {
          try {
            d.gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            setTimeout(() => {
              d.osc.stop();
              d.osc.disconnect();
            }, 450);
          } catch {
            // ignore
          }
        });
      };
      this.activeLoopStopper = stopper;
      return { stop: stopper };
    } else if (preset === 'evening-aarti') {
      // 108 Diya Aarti Bell & Dhak crescendo
      this.playShankha(3.5);
      let step = 0;
      const id = window.setInterval(() => {
        if (!isRunning) return;
        if (step % 2 === 0) this.playTempleBell();
        this.playDhakStrike(step % 4 === 0 ? 'dha' : 'tak');
        if (step % 16 === 0) this.playShankha(3);
        step++;
      }, 350);
      intervals.push(id);
    } else {
      // Default Meditative Mantra Tanpura Drone
      const droneNotes = [130.81, 164.81, 196.0, 261.63];
      const droneOscs = droneNotes.map((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        return { osc, gain };
      });

      const stopper = () => {
        isRunning = false;
        droneOscs.forEach((d) => {
          try {
            d.gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            setTimeout(() => {
              d.osc.stop();
              d.osc.disconnect();
            }, 450);
          } catch {
            // ignore
          }
        });
      };
      this.activeLoopStopper = stopper;
      return { stop: stopper };
    }

    const stopper = () => {
      isRunning = false;
      intervals.forEach((i) => clearInterval(i));
    };
    this.activeLoopStopper = stopper;
    return { stop: stopper };
  }

  // 6. Continuous Mantra Drone
  public createMantraDrone(): { stop: () => void } {
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return { stop: () => {} };

    const notes = [130.81, 164.81, 196.0, 261.63];
    const nodes: { osc: OscillatorNode; gain: GainNode }[] = [];
    const droneMasterGain = ctx.createGain();
    droneMasterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneMasterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.2);
    droneMasterGain.connect(this.masterGain);

    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.connect(gain);
      gain.connect(droneMasterGain);
      osc.start();
      nodes.push({ osc, gain });
    });

    return {
      stop: () => {
        droneMasterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        setTimeout(() => {
          nodes.forEach((n) => {
            try {
              n.osc.stop();
              n.osc.disconnect();
            } catch {
              // ignore
            }
          });
          droneMasterGain.disconnect();
        }, 900);
      },
    };
  }

  // 7. Play Predefined Dhak Rhythm Pattern
  public playRhythmPattern(
    pattern: ('dha' | 'tak' | 'koor' | 'rest')[],
    bpm: number = 110,
    onStep?: (stepIndex: number) => void
  ): { stop: () => void } {
    const ctx = this.getContext();
    if (!ctx) return { stop: () => {} };

    const stepDuration = 60 / bpm / 2;
    let stepIndex = 0;
    let isRunning = true;

    const intervalId = window.setInterval(() => {
      if (!isRunning) return;
      const currentHit = pattern[stepIndex % pattern.length];
      if (currentHit !== 'rest') {
        this.playDhakStrike(currentHit);
      }
      if (stepIndex % 4 === 0) {
        this.playTempleBell();
      }
      onStep?.(stepIndex % pattern.length);
      stepIndex++;
    }, stepDuration * 1000);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(intervalId);
      },
    };
  }
}

export const audioSynth = new ProceduralAudioEngine();
