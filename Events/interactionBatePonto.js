const sqlite3 = require("sqlite3")
const config = require("../config.json"); // Substitua pelo caminho real do seu arquivo de configuração
const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    const arquivoBanco = 'pontos.db';
    const canalLogId = config.batepontolog
    
    const db = new sqlite3.Database(arquivoBanco);
    
    // Cria a tabela se ela não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS pontos (
        usuario_id TEXT PRIMARY KEY,
        aberto INTEGER,
        intervalos TEXT
      )
    `);
    
    function formatarTempo(segundos) {
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const segundosRestantes = segundos % 60;
    
      return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
    }
if (!interaction.isButton()) return;

  const idUsuario = interaction.user.id;

  // Verifica se o usuário existe no banco de dados
  db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!row) {
      // Se o usuário não existir, adiciona ao banco de dados
      db.run('INSERT INTO pontos (usuario_id, aberto, intervalos) VALUES (?, NULL, "[]")', [idUsuario]);
    }

    if (interaction.customId === 'abrir_ponto') {
      // Atualiza o campo 'aberto' no banco de dados
      db.run('UPDATE pontos SET aberto = ? WHERE usuario_id = ?', [Date.now(), idUsuario], (err) => {
        if (err) console.error(err);
      });

      await interaction.reply({ content: '<:iconscorrect:1198037618361905345> | Ponto aberto!', ephemeral: true });
      const canalLog = client.channels.cache.get(canalLogId);

      let rowpontoc = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("fechar_ponto")
          .setLabel("Fechar Ponto")
          .setEmoji("1198037616956821515")
          .setStyle(Discord.ButtonStyle.Danger),
      )
      if (canalLog) {
        canalLog.send({ content: `> <:iconscorrect:1198037618361905345> | Ponto do usuário ${interaction.user} aberto.`, components: [rowpontoc] });
      }
    } else if (interaction.customId === 'fechar_ponto' ) {
      if (row.aberto) {
        const fechado = new Date();
        const aberto = new Date(row.aberto);
        const intervalo = (fechado - aberto) / 1000;

        // Atualiza o banco de dados com o intervalo
        const novosIntervalos = JSON.parse(row.intervalos);
        novosIntervalos.push(intervalo);

        db.run('UPDATE pontos SET aberto = NULL, intervalos = ? WHERE usuario_id = ?', [JSON.stringify(novosIntervalos), idUsuario], (err) => {
          if (err) console.error(err);
        });

        await interaction.reply({ content: `> 🙋 | Ponto fechado! Intervalo: ${formatarTempo(intervalo)}`, ephemeral: true });
        const canalLog = client.channels.cache.get(canalLogId);
        if (canalLog) {
          canalLog.send(`> 🙋 | Ponto do usuário ${interaction.user} fechado com ${formatarTempo(intervalo)}.`);
        }
      } else {
        await interaction.reply({ content: '> <:icons_Wrong75:1198037616956821515> | Você não tem um ponto aberto.', ephemeral: true });
      }
    }
  });
}