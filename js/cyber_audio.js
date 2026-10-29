// Modulo de Sintese de Audio Cibernetico (Web Audio API)
// Fornece efeitos sonoros tecnologicos sem necessidade de arquivos externos

const CYBER_AUDIO = {
  ctx: null,
  ativo: true,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  garantirCtx() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  tocar(tipo) {
    if (!this.ativo) return;
    try {
      this.garantirCtx();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (tipo === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(1400, t + 0.06);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.06);
        osc.start(t);
        osc.stop(t + 0.06);
      } else if (tipo === 'sucesso') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, t + 0.24); // C6
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.24);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
      } else if (tipo === 'concluir') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.15);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
      } else if (tipo === 'excluir') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.18);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.18);
      } else if (tipo === 'ai_ativar') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.25);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
      } else if (tipo === 'ai_beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, t);
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.04);
        osc.start(t);
        osc.stop(t + 0.04);
      }
    } catch (e) {
      console.warn('Audio feedback nao suportado:', e);
    }
  },

  alternarSom() {
    this.ativo = !this.ativo;
    return this.ativo;
  }
};
