const Discord = require("discord.js");
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('pontos.db'); // Use o mesmo nome do banco de dados que você definiu anteriormente

module.exports = {
  name: "ranking",
  description: "[👑 Moderação] Veja o ranking dos usuarios com mais bateponto aberto.",
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
        const intervalosArray = row.intervalos ? JSON.parse(row.intervalos) : [];
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
        return interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true });
      }
      interaction.reply({ content: `<:refresh:1197986033594269778> | Ranking em processamento embreve será apresentado.`, ephemeral: true });
      const ranking = calcularRanking(rows);
      var d = new Date();
      let resposta = `# Ranking de Tempo de Ponto: \n- Solicitado por: ${interaction.user} \n- Data: ${d} \n\n`;

      for (let i = 0; i < ranking.length; i++) {
        const user = ranking[i];

        try {
          const membro = await interaction.guild.members.fetch(user.idUsuario);

          // Verifica se o membro existe antes de adicionar à resposta
          if (membro) {
            const nomeUsuario = membro.displayName;
            const tempoFormatado = formatarTempo(user.tempoTotal);

            let emoji = '';
            if (i === 0) emoji = '`🥇` ';
            else if (i === 1) emoji = '`🥈` ';
            else if (i === 2) emoji = '`🥉` ';
            else if (i >= 2) emoji = '`🎖️` ';

            resposta += `${emoji}${nomeUsuario}: ${tempoFormatado}\n`;
          }
        } catch (error) {
          console.error(error);
        }
      }
        interaction.channel.send({ content: resposta });
    });
  },  
};
