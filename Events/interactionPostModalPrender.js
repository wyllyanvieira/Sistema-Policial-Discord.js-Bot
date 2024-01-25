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
    const ftextinput_foto = interaction.fields.getTextInputValue("textinput_foto");
    const ftextinput_artigos = interaction.fields.getTextInputValue("textinput_artigos");
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let mim = today.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy + ' as ' + hh + ':' + mim;

    interaction.reply({
      content: `Olá ${interaction.user}, seu realtorio foi computado. Agradecemos pelo apoio!`,
      ephemeral: true
    });

    channelModal.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor("#2f3136")
          .setAuthor({ name: `📃 Documentação enviada por — ${interaction.user}` })
          .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true }))
          .setFields(
            {
              name: '<:id:1197986083590389861> Passaporte e nome do Cidadão',
              value: `\`${ftextinput_idname}\``,
              inline: true
            },
            {
              name: '<:info:1197986066779607121> Data da prisão',
              value: `\`${formattedToday} \``,
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
            {
              name: '<:rules:1197986061750632598>IMAGEM DO INDIVIDU-O',
              value: `[CLIQUE PARA ABRIR A IMAGEM](${ftextinput_foto})`,
              inline: false
            },
          )

      ]
    });
  }



}
