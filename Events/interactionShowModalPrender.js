
const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
  if (interaction.customId.startsWith('buttonprisao')) {
    let textinput_id = new Discord.TextInputBuilder()
      .setCustomId('textinput_id')
      .setLabel('Digite nome e passaporte do cidadão')
      .setStyle(Discord.TextInputStyle.Short)
      .setPlaceholder('Digite ID e Nome (In-Game)')
      .setRequired(true)

    let textinput_descricao = new Discord.TextInputBuilder()
      .setCustomId('textinput_descricao')
      .setLabel('Descreva o ocorrido para execultar a prisão')
      .setStyle(Discord.TextInputStyle.Paragraph)
      .setMinLength(2) // Minimo de 2 digitos.
      .setMaxLength(2500) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite até 2500 Caracteres.')
      .setRequired(true)

    let textinput_foto = new Discord.TextInputBuilder()
      .setCustomId('textinput_foto')
      .setLabel('Anexe imagem do detento: ')
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1) // Minimo de 1 digitos.
      .setMaxLength(100) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Anexe link do individu-o preso')
      .setRequired(true)

    let textinput_artigos = new Discord.TextInputBuilder()
      .setCustomId('textinput_artigos')
      .setLabel('Descreva os Artigos que foi aplicado')
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1) // Minimo de 1 digitos.
      .setMaxLength(100) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite apenas numeros')
      .setRequired(true)

    let textinput_oficiais = new Discord.TextInputBuilder()
      .setCustomId('textinput_oficiais')
      .setLabel('Descreva o codigo do distintivo dos oficiais')
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1) // Minimo de 1 digitos.
      .setMaxLength(1000) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite apenas numeros')
      .setRequired(true)

    const modal_sugest = new Discord.ModalBuilder()
      .setCustomId('modal_sugest')
      .setTitle('Sistema de relatorio de prisão')

    const umActionRow = new Discord.ActionRowBuilder().addComponents(textinput_id);
    const doisActionRow = new Discord.ActionRowBuilder().addComponents(textinput_descricao);
    const tresActionRow = new Discord.ActionRowBuilder().addComponents(textinput_oficiais);
    const quatroActionRow = new Discord.ActionRowBuilder().addComponents(textinput_foto);
    const cincoActionRow = new Discord.ActionRowBuilder().addComponents(textinput_artigos);

    modal_sugest.addComponents(umActionRow, doisActionRow, tresActionRow, quatroActionRow, cincoActionRow);

    await interaction.showModal(modal_sugest)
  }


};
