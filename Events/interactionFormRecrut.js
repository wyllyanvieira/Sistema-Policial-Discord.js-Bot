const Discord = require("discord.js");
const sqlite3 = require("sqlite3");
const config = require("../config.json");

const arquivoBanco = 'recrutamento.db';
const db = new sqlite3.Database(arquivoBanco);

module.exports = async (client, interaction) => {
    const database = await obterDadosBanco(interaction.message?.id);
    if (!database) return;

    const member = interaction.guild.members.cache.get(interaction.user?.id);
    if (!member) return;

    if (interaction.isButton() && interaction.customId === "aceitar_button") {
        if (!member.roles.cache.get(config.RECRUTAMENTO.cargo_verificador))
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("Default")
                        .setDescription(
                            `<:icons_Wrong75:1198037616956821515> | Você não tem permissão para aprovar este usuário`
                        ),
                ],
                ephemeral: true,
            });

        const membro = await interaction.guild.members.cache.get(database.usuario);
        if (!membro) return;

        const role = interaction.guild.roles.cache.find((r) => r.id === config.RECRUTAMENTO.cargo_aprovado);
        membro.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setDescription(`# ${membro}, temos o prazer de informar que sua candidatura foi aprovada! 🎉

                    Parabéns pela conquista! Aqui estão os próximos passos:
                    
                    1. **Entrevista:**
                       Nosso próximo passo é uma entrevista. Fique atento(a) às instruções sobre data, horário qualquer dúvida solícite sua entrevista no <#1196585157797359682>.
                    
                    2. **Treinamento Inicial:**
                       Após a entrevista bem-sucedida, você passará por um treinamento inicial para se familiarizar com os procedimentos da **Rondas Ostensivas Tobias de Aguiar**.
                    
                    3. **Integração ao Grupo:**
                       Uma vez concluído o treinamento, você será oficialmente integrado ao grupo da Polícia. Receberá mais informações sobre suas responsabilidades e funções.
                    
                    4. **Comunicação Oficial:**
                       Mantenha-se atento(a) aos canais oficiais de comunicação para receber atualizações e informações importantes.
                    
                    Agradecemos pelo seu comprometimento e entusiasmo. Estamos ansiosos para trabalhar juntos na **Rondas Ostensivas Tobias de Aguiar**!
                    
                    Se tiver alguma dúvida ou precisar de mais informações, não hesite em entrar em contato.
                    
                   **Parabéns novamente e seja bem-vindo(a)! 🌟**
                    `)
            ]
        })
        membro.roles.add(role)
            .then(() => console.log(`adicionado cargo para ${membro} por ter sido aprovado no recrutamento`))
            .catch(console.error);

        interaction.update({
            embeds: [
                new Discord.MessageEmbed()
                    .setDescription(`<:iconscorrect:1198037618361905345> | O usuário ${membro} foi aprovado por ${interaction.user?.username}`)
            ],
            components: []

        })
        // Remova do banco de dados após aprovado (se necessário)
        await removerDadosBanco(interaction.message.id);
    }

    if (interaction.isButton() && interaction.customId === "negar_button") {
        if (!member.roles.cache.get(config.RECRUTAMENTO.cargo_verificador))
        return interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("Default")
                    .setDescription(
                        `<:icons_Wrong75:1198037616956821515> | Você não tem permissão para reprovar este usuário`
                    ),
            ],
            ephemeral: true,
        });

        const membro = await interaction.guild.members.cache.get(database.usuario);
        if (!membro) return;

        membro.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`## ${membro} lamentamos informar que sua candidatura não foi aprovada neste momento. 💔

                    Possíveis Causas:
                    
                    1. **Nick Inadequado:**
                       Verifique se o seu nome de usuário está de acordo com nossas diretrizes.
                    
                    2. **Tempo Insuficiente:**
                       Pode ser que não tenha sido possível avaliar completamente sua aplicação.
                    
                    3. **Vagas Esgotadas:**
                       Em alguns casos, as posições disponíveis podem ter sido preenchidas.
                    
                    4. **Motivo Incorreto:**
                       Certifique-se de ter escolhido o motivo correto ao se candidatar.
                    
                    5. **Comportamento Inadequado no Servidor:**
                       A conduta no servidor é um aspecto crucial durante o processo de seleção.
                    
                    6. **Idade Muito Baixa:**
                       A idade mínima pode ser um critério para participação.
                    
                    7. **Respostas Incorretas:**
                       Relembre suas respostas; elas podem ter influenciado na decisão.
                    
                    8. **Outros Fatores:**
                       Diversos fatores podem impactar a decisão, e alguns podem não ter sido listados.
                    
                    Agradecemos o seu interesse, e encorajamos que continue buscando oportunidades no futuro. Se desejar mais feedback, sinta-se à vontade para entrar em contato conosco.
                    
                    Agradecemos pela compreensão. 🌟`)
            ]
        })

        interaction.update({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`<:icons_Wrong75:1198037616956821515> | ${membro} Foi infelizmente reprovado`)
            ],
            components: []
        })
        // Remova do banco de dados após reprovado (se necessário)
        await removerDadosBanco(interaction.message.id);
    }
}

async function obterDadosBanco(messageId) {
    return new Promise((resolve, reject) => {
        if (!messageId) {
            resolve(null); // Retorna nulo se a messageId for indefinida
            return;
        }

        db.get('SELECT * FROM recrutamento WHERE mensagem_id = ?', [messageId], (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}


async function removerDadosBanco(messageId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM recrutamento WHERE mensagem_id = ?', [messageId], (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
