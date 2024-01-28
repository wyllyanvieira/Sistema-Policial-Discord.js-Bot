const Discord = require("discord.js");

module.exports = {
    name: "calcular",
    description: "Calcula o tempo em segundos.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "segundos",
            description: "O tempo no formato 'h m s'.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const tempoString = interaction.options.getString("segundos");

        // Extrai horas, minutos e segundos da string fornecida
        const regex = /(?:(\d+)h\s*)?(?:(\d+)m\s*)?(?:(\d+)s\s*)?/;
        const match = tempoString.match(regex);

        if (!match) {
            return interaction.reply({ content: "<:imao:1198035218716692490> | Formato de tempo inválido. Use o formato 'h m s' exemplo: h = Hora, m = Minutos e  s = Segundos.", ephemeral: true });
        }

        const horas = parseInt(match[1]) || 0;
        const minutos = parseInt(match[2]) || 0;
        const segundos = parseInt(match[3]) || 0;

        // Calcula o total de segundos
        const totalSegundos = horas * 3600 + minutos * 60 + segundos;

        interaction.reply({ content: `<:management:1197986783808471171> | O tempo total em segundos é: ${totalSegundos}`, ephemeral: true });
    }
};
