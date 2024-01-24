const Discord = require("discord.js");
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('pontos.db'); // Use o mesmo nome do banco de dados que você definiu anteriormente

module.exports = {
  name: "verhoras",
  description: "[🦅 Utilidade] Veja quanto tempo você patrulhou.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const idUsuario = interaction.user.id;

    // Obtém os dados do banco de dados para o usuário específico
    db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
      if (err) {
        console.error(err);
        return interaction.reply({ content: '<:icons_Wrong75:1198037616956821515> | Ocorreu um erro ao buscar os dados.', ephemeral: true });
      }

      if (!row) {
        return interaction.reply({ content: '<:icons_Wrong75:1198037616956821515> | Você ainda não patrulhou após o último reset..', ephemeral: true });
      }

      const intervalosArray = JSON.parse(row.intervalos); // Converte a string JSON do banco de dados em um array
      const tempoTotal = intervalosArray.reduce((acc, intervalo) => acc + intervalo, 0);
      const tempoAbertoAtual = row.aberto ? (new Date() - new Date(row.aberto)) / 1000 : 0;

      const tempoAbertoAtualFormatado = formatarTempo(tempoAbertoAtual);
      const tempoTotalFormatado = formatarTempo(tempoTotal + tempoAbertoAtual);
      if (tempoAbertoAtual == 0) {
        interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Você patrulhou por: ${tempoTotalFormatado}.`, ephemeral: true });
      } else {
        interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Você está com ponto aberto há: ${tempoAbertoAtualFormatado}`, ephemeral: true });
      }
    });
  },
};

function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
}
