
# Bot de controle Policial


## Instalação

para instalar o projeto utilize o comando:

```bash
  npm install
```
apos execultar a Instalação procure o [arquivo (config.json)](https://github.com/wyllyanvieira/Sistema-Policial-Discord.js-Bot/blob/main/config.json) e complete os campos 
    
```bash
 {
    "token": "TOKEN DO BOT",
    "embedcolor" : "2f3136",
    "relatoriolog" : "ID",
    "batepontolog" : "ID",
    "ausenciaLog": "ID",
    "siglaguarnição" : "SIGLA EX> PMESP, PMERJ ",

    "AUSENCIA":{
        "cargo_verificador":"ID",
        "cargo_ausencia":"ID"
    },

    "TICKET":{
        "cargo": "ID",
        "ticketlogs": "ID",
        "categoria": "ID"
    },


    "ADVERTENCIAS": {
        "advertanciacanal":"ID",
        "exonerascanal": "ID",
        "cargoadv_verbal":"ID",
        "cargoadv_1":"ID",
        "cargoadv_2":"ID"
    },
    "HIERARQUIA": [
         ID CARGO 1,
         ID CARGO 2,
         ID CARGO 3,
         ID CARGO 4,
         ID CARGO 5,
         ID CARGO 6,
         ID CARGO 7


    ]

}
```
Completanndo os campos verifique a integridade dos arquivos e inicalize o projeto com:

```
node .
```

Perfeito se tudo estiver correto o bot inicalizará sozinho.



## Funcionalidades

- Controle de Membros Exoneração, Advertencia, Etc...
- Sistema de Bate-ponto completo com (ranking)
- Sistema de Verificação de tempo de ponto aberto
- Sistema de envio de mensagens base por comando
- Sistema de Controle de Ausencias dos membros




## Referência

 - [Discord.js](https://discord.js.org/) - Sistema Utilizado para criação do bot
 - [Tangerino](tangerino.com.br/controle-de-ponto) - Inspiração para criação do sistema de bate-ponto
 - [SqlLite](https://www.sqlite.org/index.html) -  Sistema estudado para armazenagem de arquivo em modo local.


## Liscensas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


