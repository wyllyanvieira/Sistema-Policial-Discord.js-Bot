const Discord = require("discord.js");
const sqlite3 = require('sqlite3');
const config = require("../../config.json")

const db = new sqlite3.Database('pontos.db');

module.exports = {
    name: "gerenciarhora",
    description: "[🕒 Moderação] Adicionar ou remover horas de um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "adicionar",
            description: "Adiciona horas a um usuário.",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "usuario",
                    description: "O usuário para adicionar horas.",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "tempo",
                    description: "O tempo a ser adicionado em segundos.",
                    type: Discord.ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        },
        {
            name: "remover",
            description: "Remove horas de um usuário.",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "usuario",
                    description: "O usuário para remover horas.",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "tempo",
                    description: "O tempo a ser removido em segundos.",
                    type: Discord.ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        }
    ],

    run: async (client, interaction) => {
        const canalLog = client.channels.cache.get(config.batepontolog);
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            interaction.reply({
              content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`,
              ephemeral: true,
            });
        }
        const subCommand = interaction.options.getSubcommand();
        
        if (subCommand === "adicionar") {
            const usuario = interaction.options.getUser("usuario");
            const tempo = interaction.options.getInteger("tempo");
    
            // Lógica para adicionar horas ao usuário
            adicionarHoras(usuario.id, tempo, interaction, canalLog);
        } else if (subCommand === "remover") {
            const usuario = interaction.options.getUser("usuario");
            const tempo = interaction.options.getInteger("tempo");
    
            // Lógica para remover horas do usuário
            removerHoras(usuario.id, tempo, interaction, canalLog);
        }
    },    
};

function adicionarHoras(usuarioId, tempo, interaction, canalLog) {
    
    
    db.get('SELECT * FROM pontos WHERE usuario_id = ?', [usuarioId], async (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        // Verifica se o usuário possui um registro no banco de dados
        if (!row) {
            await interaction.reply({ content: '> <:icons_Wrong75:1198037616956821515> | Usuário não encontrado no banco de dados.', ephemeral: true });
            return;
        }

        // Lógica para adicionar horas ao usuário
        const novosIntervalos = row.intervalos ? JSON.parse(row.intervalos) : [];
        novosIntervalos.push(tempo);

        db.run('UPDATE pontos SET intervalos = ? WHERE usuario_id = ?', [JSON.stringify(novosIntervalos), usuarioId], (err) => {
            if (err) console.error(err);
        });

        await interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Horas adicionadas com sucesso para o usuário com <@${usuarioId}>.`, ephemeral: true });
        
        if (canalLog) {
            canalLog.send({ content: `<:imao:1198035218716692490> | O Usuario <@${usuarioId}> teve **${formatarTempo(tempo)}** adicionado por ${interaction.user}.`});
        }
    });
}

function removerHoras(usuarioId, tempo, interaction, canalLog) {
    db.get('SELECT * FROM pontos WHERE usuario_id = ?', [usuarioId], async (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        // Verifica se o usuário possui um registro no banco de dados
        if (!row) {
            await interaction.reply({ content: '> <:icons_Wrong75:1198037616956821515> | Usuário não encontrado no banco de dados.', ephemeral: true });
            return;
        }

        // Lógica para remover horas do usuário
        const novosIntervalos = row.intervalos ? JSON.parse(row.intervalos) : [];
        if (novosIntervalos.length === 0) {
            await interaction.reply({ content: '> <:icons_Wrong75:1198037616956821515> | O usuário não tem horas registradas.', ephemeral: true });
            return;
        }

        const totalHoras = novosIntervalos.reduce((acc, intervalo) => acc + intervalo, 0);
        if (totalHoras < tempo) {
            await interaction.reply({ content: '> <:icons_Wrong75:1198037616956821515> | O usuário não tem horas suficientes para remover.', ephemeral: true });
            return;
        }

        // Remove o tempo especificado
        let tempoRestante = tempo;
        while (tempoRestante > 0) {
            const ultimaHora = novosIntervalos.pop();
            if (tempoRestante >= ultimaHora) {
                tempoRestante -= ultimaHora;
            } else {
                novosIntervalos.push(ultimaHora - tempoRestante);
                tempoRestante = 0;
            }
        }

        db.run('UPDATE pontos SET intervalos = ? WHERE usuario_id = ?', [JSON.stringify(novosIntervalos), usuarioId], (err) => {
            if (err) console.error(err);
        });

        
        await interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Horas removidas com sucesso do usuario usuário <@${usuarioId}>.`, ephemeral: true });
        
        if (canalLog) {
            canalLog.send({ content: `<:imao:1198035218716692490> | O Usuario <@${usuarioId}> teve **${formatarTempo(tempo)}** removido por ${interaction.user}.`});
        } 
    });
}
function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
  
    return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
  }
