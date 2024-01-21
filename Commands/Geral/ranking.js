const Discord = require("discord.js");
const { Timestamp } = require("mongodb");
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('pontos.db'); // Use o mesmo nome do banco de dados que você definiu anteriormente

module.exports = {
  name: "ranking",
  description: "[🦅 Utilidade] Veja o ping do botranking do pessoal com ponto batido.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    function formatarTempo(segundos) {
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const segundosRestantes = segundos % 60;

      return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
    }

    function calcularRanking(rows) {
      const ranking = rows.map(row => {
        const intervalosArray = JSON.parse(row.intervalos); // Converte a string JSON para um array
        const tempoTotal = intervalosArray.reduce((acc, intervalo) => acc + intervalo, 0);
        const tempoAbertoAtual = row.aberto ? (new Date() - new Date(row.aberto)) / 1000 : 0;
        return { idUsuario: row.usuario_id, tempoTotal: tempoTotal + tempoAbertoAtual };
      });

      ranking.sort((a, b) => b.tempoTotal - a.tempoTotal);

      return ranking;
    }

    // Obtém os dados do banco de dados
    db.all('SELECT * FROM pontos', async (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
        interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
      const ranking = calcularRanking(rows);
      var d = new Date();
      let resposta = `# Ranking de Tempo de Ponto: \n- Solicitado por: ${interaction.user} \n- Data: ${d} \n\n`;
      for (let i = 0; i < ranking.length; i++) {
        const user = ranking[i];
        try {
          const membro = await interaction.guild.members.fetch(user.idUsuario);
          const nomeUsuario = membro ? membro.displayName : 'Usuário desconhecido';
          const tempoFormatado = formatarTempo(user.tempoTotal);

          let emoji = '';
          if (i === 0) emoji = '🥇 ';
          else if (i === 1) emoji = '🥈 ';
          else if (i === 2) emoji = '🥉 ';
          else if (i >= 2) emoji = '🎖️ ';

          resposta += `${emoji}${membro}: ${tempoFormatado}\n`;
        } catch (error) {
          resposta += `Usuário desconhecido (ID: ${user.idUsuario}): ${formatarTempo(user.tempoTotal)}\n`;
        }
      }

      interaction.reply({ content: resposta});
    }
    });
  },
};
