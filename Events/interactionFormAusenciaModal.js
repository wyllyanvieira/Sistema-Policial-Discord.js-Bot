const Discord = require("discord.js");
const sqlite3 = require("sqlite3");
const config = require("../config.json");

const arquivoBanco = 'ausencia.db';
const db = new sqlite3.Database(arquivoBanco);
const canalLogId = config.ausenciaLog;

module.exports = async (client, interaction) => {

    if (interaction.isButton() && interaction.customId === "formausencia") {
        const modal = new Discord.ModalBuilder()
            .setCustomId("modal_ausencia")
            .setTitle(`Declaração de Ausência`);

        const tempoOff = new Discord.TextInputBuilder()
            .setCustomId('tempo_off')
            .setLabel('Até quando você ficará ausente? (DD/MM/AAAA)')
            .setPlaceholder('Digite a data de retorno')
            .setStyle(Discord.TextInputStyle.Short)
        const motivo = new Discord.TextInputBuilder()
            .setCustomId('motivo')
            .setLabel('Qual motivo da Ausencia')
            .setPlaceholder('Digite o motivo por qual ficará ausente')
            .setStyle(Discord.TextInputStyle.Paragraph)

        modal.addComponents(
            new Discord.ActionRowBuilder().addComponents(tempoOff),
            new Discord.ActionRowBuilder().addComponents(motivo)
        );

        return interaction.showModal(modal);
    };

    if (interaction.isModalSubmit() && interaction.customId === "modal_ausencia") {
        const tempoOff = interaction.fields.getTextInputValue("tempo_off");
        const motivo = interaction.fields.getTextInputValue("motivo");
    
        // Converta a entrada da data para um objeto Date
        const dataInput = tempoOff.split('/');
        const dataAusencia = new Date(parseInt(dataInput[2]), parseInt(dataInput[1]) - 1, parseInt(dataInput[0]));

        db.get('SELECT * FROM ausencia WHERE usuario_id = ?', [interaction.user.id], (err, row) => {
            if (err) {
                console.error(err);
                return;
            }
        
            // Se já existir um registro de ausência para o usuário, notifique-o
            if (row) {
                return interaction.reply({ content: `> <:icons_Wrong75:1198037616956821515> | ${interaction.user} Você já possui uma ausência registrada.`, ephemeral: true });
            }
        });
    
        // Verifique se a data de ausência é anterior à data atual
        const dataAtual = new Date();
        if (dataAusencia < dataAtual) {
            return interaction.reply({ content: `> <:icons_Wrong75:1198037616956821515> | ${interaction.user} A data de ausência não pode ser anterior à data atual. Por favor, insira uma data válida.`, ephemeral: true });
        }
        if (dataAusencia === dataAtual) {
            return interaction.reply({ content: `> <:icons_Wrong75:1198037616956821515> | ${interaction.user} A data de ausência não pode ser igual à data atual. Por favor, insira uma data válida acima de hoje.`, ephemeral: true });
        }
        
        // Continue com a inserção dos dados no banco de dados SQLite
        db.run('INSERT INTO ausencia (usuario_id, tempo_off) VALUES (?, ?)', [interaction.user.id, tempoOff], (err) => {
            if (err) {
                console.error(err);
                return interaction.reply({ content: `> <:icons_Wrong75:1198037616956821515> | ${interaction.user} Houve um erro ao registrar sua ausência.`, ephemeral: true });
            }
    
            interaction.reply({ content: `> <:iconscorrect:1198037618361905345> | ${interaction.user} Sua ausência foi registrada até ${tempoOff}, dentro desse prazo fica impedido de bater-ponto.`, ephemeral: true });
            const canalLog = client.channels.cache.get(canalLogId);
            if (canalLog) {
              canalLog.send({ content: `<:info:1197986066779607121> | O Oficial ${interaction.user} teve seu registro de ausencia adicionado até a data de **${tempoOff}** pelo motivo de: ${motivo}.`});
            }
        });

        // Verifica se a data de retorno é atingida e remove o usuário da tabela de ausência
        const tempoOffMilliseconds = dataAusencia.getTime();
        const agoraMilliseconds = Date.now();
        const diffMilliseconds = tempoOffMilliseconds - agoraMilliseconds;

        setTimeout(() => {
            db.run('DELETE FROM ausencia WHERE usuario_id = ?', [interaction.user.id], (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Usuário ${interaction.user.id} removido da lista de ausência.`);
                const canalLog = client.channels.cache.get(canalLogId);
                if (canalLog) {
                  interaction.user.send({ content: `<:info:1197986066779607121> | Olá ${interaction.user} seu periodo de ausencia foi encerrado, portanto deve retornar a suas atividades na corporação.`})  
                  canalLog.send({ content: `<:info:1197986066779607121> | O Usuario ${interaction.user} terminou seu periodo de ausencia solicitado, seus acessoas ao sistema retornaram.`});
                }
            });
        }, diffMilliseconds);
    }
    // Função para verificar se o usuário está ausente
}
