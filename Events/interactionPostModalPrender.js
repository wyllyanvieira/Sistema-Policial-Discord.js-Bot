const config = require("../config.json"); // Substitua pelo caminho real do seu arquivo de configuração
const Discord = require("discord.js");

module.exports = async (client, interaction) => {

    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'modal_sugest') {
      let canalModel = config.relatoriolog
      let channelModal = client.channels.cache.get(canalModel)  // Enviar a avaliação pro canal
  
  
      const ftextinput_idname = interaction.fields.getTextInputValue("textinput_id");
      const ftextinput_desc = interaction.fields.getTextInputValue("textinput_descricao");
      const ftextinput_oficiais = interaction.fields.getTextInputValue("textinput_oficiais");
      const ftextinput_pena = interaction.fields.getTextInputValue("textinput_pena");
      const ftextinput_artigos = interaction.fields.getTextInputValue("textinput_artigos");
  
  
      interaction.reply({
        content: `Olá ${interaction.user}, seu realtorio foi computado. Agradecemos pelo apoio!`,
        ephemeral: true
      });
  
      channelModal.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("#2f3136")
            .setAuthor({ name: `📃 Documentação enviada por — ${interaction.user.username}` })
            .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true }))
            .setFields(
              {
                name: '<:id:1197986083590389861> Passaporte e nome do Cidadão',
                value: `\`${ftextinput_idname}\``,
                inline: true
              },
              {
                name: '<:Handcuffs:1198037614087909416> Pena de Prisão',
                value: `\`${ftextinput_pena} Meses\``,
                inline: true
              },
              {
                name: '<:iconcreditcard:1197986075117887649> Artigos Aplicada',
                value: `\`Arts. ${ftextinput_artigos}\``,
                inline: true
              },
              {
                name: '<:members:1197986377464303738> Policiais que participaram da QRU (DISTINTIVO)',
                value: `\`${ftextinput_oficiais}\``,
                inline: true
              },
              {
                name: '<:rules:1197986061750632598> Descrição da QRU',
                value: `\`\`\`${ftextinput_desc}\`\`\``,
                inline: false
              },
            )
  
        ]
      });
    }
  
  

}
