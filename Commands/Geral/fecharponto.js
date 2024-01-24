const Discord = require("discord.js");
const sqlite3 = require("sqlite3");
const config = require("../../config.json");

// Função para formatar tempo
function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
}

// Função para fechar ponto
async function fecharPonto2(idUsuario, interaction, client, canalLogId, db) {
  db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (row.aberto) {
      const fechado = new Date();
      const aberto = new Date(row.aberto);
      const intervalo = (fechado - aberto) / 1000;

      // Atualiza o banco de dados com o intervalo
      const novosIntervalos = JSON.parse(row.intervalos);
      novosIntervalos.push(3600);

      db.run('UPDATE pontos SET aberto = NULL, intervalos = ? WHERE usuario_id = ?', [JSON.stringify(novosIntervalos), idUsuario], (err) => {
        if (err) console.error(err);
      });

      await interaction.reply({ content: `> <:delete:1197986063554187284> | Ponto fechado de maneira forçada! Intervalo deis da abertura de  ${formatarTempo(intervalo)}`, ephemeral: true });
      const canalLog = client.channels.cache.get(canalLogId);
      if (canalLog) {
        canalLog.send(`> <:delete:1197986063554187284> | Ponto do usuário ${interaction.user} fechado de maneira forçada por ${interaction.user} com intervalo deis de sua abertura de ${formatarTempo(intervalo)} .`);
      }
    } else {
      await interaction.reply({ content: '> <:icons_Wrong75:1198037616956821515> | Você não tem um ponto aberto.', ephemeral: true });
    }
  });
}

module.exports = {
  name: "fecharponto",
  description: "[🕰️ Utilidade] Fechar ponto de um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const arquivoBanco = 'pontos.db';
    const canalLogId = config.batepontolog;

    const db = new sqlite3.Database(arquivoBanco);

    // Buscar usuários com ponto aberto
    db.all('SELECT * FROM pontos WHERE aberto IS NOT NULL', async (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }

      if (rows.length === 0) {
        await interaction.reply({ content: '> <:guide:1197986076984365147> | Nenhum ponto aberto no momento.', ephemeral: true });
        return;
      }

      // Criar array de opções para o dropdown
      const options = rows.map((row) => ({
        label: client.users.cache.get(row.usuario_id).tag,
        value: row.usuario_id,
      }));

      const dropdown = new Discord.StringSelectMenuBuilder()
        .setCustomId('fechar_ponto_dropdown')
        .setPlaceholder('Selecione o usuário para fechar o ponto')
        .addOptions(options);

      const row = new Discord.ActionRowBuilder().addComponents(dropdown);

      await interaction.reply({ content: 'Selecione o usuário para fechar o ponto:', components: [row], ephemeral: true });
    });

    // Evento para interação do menu suspenso
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isStringSelectMenu()) return;

      if (interaction.customId === 'fechar_ponto_dropdown') {
        const idUsuario = interaction.values[0];
        fecharPonto2(idUsuario, interaction, client, canalLogId, db);
      }
    });
  }
};
