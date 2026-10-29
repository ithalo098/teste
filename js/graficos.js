// Gerador de graficos SVG dinamicos sem bibliotecas pesadas
const GRAFICOS_ENGINE = {
  desenharBarraProgresso(porcentagem, largura = 200, altura = 20) {
    return `
      <svg width="${largura}" height="${altura}" style="border-radius: 4px; background: #e2e8f0;">
        <rect width="${porcentagem}%" height="100%" fill="#198754" rx="4" />
      </svg>
    `;
  }
};
