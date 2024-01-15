const util = require("util");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "eval",
    description: "[👑] Testar códigos.",
    options: [
        {
            name: "codigo",
            description: "Insira o código que deseja testar.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "ephemeral",
            description: "Deseja que a mensagem apareça em ephemeral?",
            type: ApplicationCommandOptionType.Boolean,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        const expression = interaction.options.getString("codigo");
        const ephemeral = interaction.options.getBoolean("ephemeral");

        const resultEmbed = new EmbedBuilder();
        const inputEmbed = new EmbedBuilder();

        inputEmbed.setColor('Green');
        inputEmbed.setTitle("Entrada");
        inputEmbed.setDescription(`\`\`\`js\n${expression}\`\`\``);

        try {
            const result = util.inspect(eval(expression));

            if (result.length > 4096) {
                resultEmbed.setColor('Red');
                resultEmbed.setTitle("Error");
                resultEmbed.setDescription(
                    "```O resultado ultrapassa 4096 caracteres. Por esse motivo não pode ser exibido!```"
                );
            } else {
                resultEmbed.setColor('Green');
                resultEmbed.setTitle("Saída");
                resultEmbed.setDescription(`\`\`\`js\n${result}\n\`\`\``);
            }

            interaction.reply({
                embeds: [inputEmbed, resultEmbed],
                ephemeral: ephemeral,
            });
        } catch (err) {
            resultEmbed.setColor('Red');
            resultEmbed.setTitle("Saída Error");
            resultEmbed.setDescription(`\`\`\`js\n${err}\n\`\`\``);

            interaction.reply({
                embeds: [inputEmbed, resultEmbed],
                ephemeral: ephemeral,
            });
        }
    },
};