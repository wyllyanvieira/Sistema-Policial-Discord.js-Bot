const Discord = require("discord.js");
const sqlite3 = require("sqlite3");


module.exports = {
  name: "clearranking",
  description:
    "[🦅 Utilidade] Limpar completamente o banco de dados de pontos.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const db = new sqlite3.Database("pontos.db"); // Use o mesmo nome do banco de dados que você definiu anteriormente
    let collector; // Mova a declaração da variável collector para fora do bloco else

    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      interaction.reply({
        content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`,
        ephemeral: true,
      });
    } else {
      const confirmButton = new Discord.ButtonBuilder()
        .setCustomId("confirm_clear")
        .setLabel("Confirmar Limpeza")
        .setStyle(Discord.ButtonStyle.Danger);

      const cancelButton = new Discord.ButtonBuilder()
        .setCustomId("cancel_clear")
        .setLabel("Cancelar")
        .setStyle(Discord.ButtonStyle.Primary);

      const row = new Discord.ActionRowBuilder().addComponents(
        confirmButton,
        cancelButton
      );

      interaction.reply({
        content:
          "<:management:1197986783808471171> Você tem certeza de que deseja limpar completamente o banco de dados de pontos?",
        components: [row],
        ephemeral: true,
      });

      const filter = (i) =>
        i.customId === "confirm_clear" || i.customId === "cancel_clear";
      collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 15000,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "confirm_clear") {
          // Limpa completamente o banco de dados
          db.run("DELETE FROM pontos", (err) => {
            if (err) {
              console.error(err);
              return interaction.editReply({
                content: "<:icons_Wrong75:1198037616956821515> Ocorreu um erro ao limpar o banco de dados.",
                components: [],
              });
            }

            interaction.editReply({
              content: "<:iconscorrect:1198037618361905345> Banco de dados limpo com sucesso!",
              components: [],
            });
          });
        } else if (i.customId === "cancel_clear") {
          interaction.editReply({
            content: "<:icons_Wrong75:1198037616956821515> Limpeza do banco de dados cancelada.",
            components: [],
          });
        }

        collector.stop();
      });
    }

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.followUp({
          content: "<:icons_Wrong75:1198037616956821515> Tempo expirado. Ação cancelada.",
          ephemeral: true,
        });
      }
    });
  },
};
