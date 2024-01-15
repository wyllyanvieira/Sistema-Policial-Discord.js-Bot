const Discord = require("discord.js");
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('pontos.db'); // Use o mesmo nome do banco de dados que você definiu anteriormente

module.exports = {
  name: "vertempo",
  description: "[🦅 Utilidade] Veja quanto tempo você patrulhou.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const idUsuario = interaction.user.id;

    // Obtém os dados do banco de dados para o usuário específico
    db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
      if (err) {
        console.error(err);
        return interaction.reply({ content: '❌ | Ocorreu um erro ao buscar os dados.', ephemeral: true });
      }

      if (!row) {
        return interaction.reply({ content: '❌ | Você ainda não patrulhou apos o ultimo reset..', ephemeral: true });
      }

      const intervalosArray = JSON.parse(row.intervalos); // Converte a string JSON do banco de dados em um array
      const tempoTotal = intervalosArray.reduce((acc, intervalo) => acc + intervalo, 0);
      const tempoAbertoAtual = row.aberto ? (new Date() - new Date(row.aberto)) / 1000 : 0;

      const tempoTotalFormatado = formatarTempo(tempoTotal + tempoAbertoAtual);

      interaction.reply({ content: `✅ | Você patrulhou por: ${tempoTotalFormatado}`, ephemeral: true });
    });
  },
};

function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
}
