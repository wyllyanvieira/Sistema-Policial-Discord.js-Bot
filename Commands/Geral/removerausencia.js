const Discord = require("discord.js");
const sqlite3 = require("sqlite3");
const config = require("../../config.json");

module.exports = {
  name: "ausencias",
  description: "[📅 Utilidade] Remover usuário da lista de ausência.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const arquivoBanco = 'ausencia.db';
    const canalLogId = config.ausenciaLog;

    const db = new sqlite3.Database(arquivoBanco);
    
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true });
    }

    // Buscar usuários na tabela de ausência
    db.all('SELECT * FROM ausencia', async (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(rows)
      if (rows.length === 0) {
        await interaction.reply({ content: '> <:guide:1197986076984365147> | Nenhum usuário na lista de ausência.', ephemeral: true });
        return;
      }

      // Criar array de opções para o dropdown
      const options = await Promise.all(rows.map(async (row) => {
        try {
          const member = await interaction.guild.members.fetch(row.usuario_id);
          const dataAusencia = row.tempo_off;

          return {
            label: `${member.displayName || member.user.username} | ${dataAusencia}`,
            value: row.usuario_id,
          };
        } catch (error) {
          console.error(`Erro ao buscar membro ${row.usuario_id}: ${error.message}`);
          return {
            label: 'Usuário não encontrado',
            value: row.usuario_id,
          };
        }
      }));

      const dropdown = new Discord.StringSelectMenuBuilder()
        .setCustomId('remover_ausencia_dropdown')
        .setPlaceholder('Selecione o usuário para remover da ausência')
        .addOptions(options);

      const row = new Discord.ActionRowBuilder().addComponents(dropdown);

      await interaction.reply({ content: 'Selecione o usuário para remover da lista de ausência:', components: [row], ephemeral: true });
    });

    // Evento para interação do menu suspenso
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isStringSelectMenu()) return;

      if (interaction.customId === 'remover_ausencia_dropdown') {
        const idUsuario = interaction.values[0];

        // Remover usuário da tabela de ausência
        db.run('DELETE FROM ausencia WHERE usuario_id = ?', [idUsuario], (err) => {
          if (err) {
            console.error(err);
            return interaction.reply({ content: `> <:icons_Wrong75:1198037616956821515> | Houve um erro ao remover o usuário da lista de ausência.`, ephemeral: true });
          }
          const canalLog = client.channels.cache.get(canalLogId);
          interaction.reply({ content: `> <:iconscorrect:1198037618361905345>| Usuário removido com sucesso da lista de ausência.`, ephemeral: true });
          if (canalLog) {
            canalLog.send({ content: `<:info:1197986066779607121> | O Usuario <@${idUsuario}> teve seu registro de ausencia removido por ${interaction.user}.`});
          }
        });
      }
    });
  }
};
