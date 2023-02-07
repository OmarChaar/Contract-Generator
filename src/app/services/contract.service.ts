import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }

  setPISOS(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>COZINHA:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - COZINHA')} - ${this.getValue(currentPersonalization, 'PISOS - COZINHA') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - COZINHA - NOME DA OPÇÃO')} cm  <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - COZINHA - PREÇO'))} <br>
      <b>Rodapé:</b> ${ this.getValue(currentPersonalization, 'PISOS - COZINHA - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - COZINHA - RODAPÉ') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - COZINHA - RODAPÉ - PREÇO'))} <br>
        `;
    }

    if(this.getValue(currentPersonalization, 'PAREDE - COZINHA') != null) {
        div.innerHTML += `
          <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - COZINHA')} - ${this.getValue(currentPersonalization, 'PAREDE - COZINHA') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PAREDE - COZINHA - NOME DA OPÇÃO')} cm <br>
          <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - COZINHA - PREÇO'))} <br>
        `;
    }
    else {
      div.innerHTML += `
          <b>Revestimento Parede:</b> Sem Revestimento <br>
      `;
    }

    div.innerHTML += `
      <b>Bancada Tipo - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - BANCADA TIPO')} - ${this.getValue(currentPersonalization, 'COZINHA - BANCADA TIPO - NOME DA OPÇÃO')} cm <br>
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA')} - ${this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA') <= 2 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA - PREÇO'))} <br>
      <b>Cuba - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - CUBA')} - ${this.getValue(currentPersonalization, 'COZINHA - CUBA - NOME DA OPÇÃO')} <br>
      <b>Cuba - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'COZINHA - CUBA - PREÇO'))} <br>
      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - TORNEIRA')} - ${this.getValue(currentPersonalization, 'COZINHA - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'COZINHA - TORNEIRA - PREÇO'))} <br>
      <b>Bitbox - Cozinha / Área De Serviço:</b> ${this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - ATIVADO') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - ATIVADO') == 'S') {
        div.innerHTML += `
          <b>Bitbox - Cozinha / Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - NOME DA OPÇÃO')} cm <br>
          <b>Bitbox - Cozinha / Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
    }

    div.innerHTML += `
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br><br>
    `;
  }

  setAreaServico(div: any, currentPersonalization: any) {
    const kitChurrasqueiraOpcao = Number(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO'))

    div.innerHTML += `
      <br>
      <b>ÁREA DE SERVIÇO:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - NOME DA OPÇÃO')} cm <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - RODAPÉ - PREÇO'))} <br>
      `;
    }

    if(this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO') != null) {
      div.innerHTML += `
        <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO - NOME DA OPÇÃO')} cm <br>
        <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO - PREÇO'))} <br>
      `;
    }
    else {
      div.innerHTML += `
        <b>Revestimento Parede:</b> Sem Revestimento <br>
      `;
    }

    // NO KIT CHURRASQUEIRA
    if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'N') {

      div.innerHTML += `
        <b>Área De Serviço E Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO')} - ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '1' ? 'Padrão' : 'Personalizado'} <br>

      `;

      if(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '1') {
        div.innerHTML += `
          <b>Tanque:</b> Modelo Padrão - Tanque 18L 50x38cm Branco Gelo - Deca <br>
          <b>Tanque - Preço:</b> ${this.convertPrice('0')} <br>
        `;
      }

      if(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '2') {
        div.innerHTML += `
          <b>Bancada - Opção:</b> Bancada 180x60 cm, Saia 0,04cm, Frontão 0,07cm <br>
          <b>Revestimento bancada - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Revestimento bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - PREÇO'))} <br>
          <b>Tanque - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} cm <br>
          <b>Tanque - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }

      div.innerHTML += `
        <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - OPÇÃO - NOME DA OPÇÃO')} <br>
        <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - PREÇO'))} <br>
      `;
    }
    // YES KIT CHURRASQUEIRA
    else if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S' || this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') {


      if(kitChurrasqueiraOpcao != 5) {
        div.innerHTML += `
          <b>Área De Serviço E Terraço - Opção:</b> ${kitChurrasqueiraOpcao} - Personalizado <br>
        `;
      }

      if(kitChurrasqueiraOpcao == 3 ) {
        div.innerHTML += `
          <b>Tanque - Opção:</b> Modelo Padrão – Área de Serviço com Tanque 18L - Deca <br>
          <b>Tanque - Preço:</b> ${this.convertPrice(0)} <br>
        `;
      }

      if(kitChurrasqueiraOpcao == 4 ) {
        div.innerHTML += `
          <b>Bancada - Opção: </b> Bancada 180x60 cm, Saia 0,04cm, Frontão 0,07cm <br>
        `;
      }

      if(kitChurrasqueiraOpcao == 4 || kitChurrasqueiraOpcao == 5) {
        div.innerHTML += `
          <b>Tanque - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - NOME DA OPÇÃO')} cm <br>
          <b>Tanque - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }

      if(kitChurrasqueiraOpcao == 4) {
        div.innerHTML += `
          <b>Revestimento bancada - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} cm <br>
          <b>Revestimento bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }



      div.innerHTML += `
        <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
        <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - PREÇO'))} <br>
      `;



    }

    div.innerHTML += `
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br><br>
    `;
  }

  setAreaServicoETerraco(div: any, currentPersonalization: any) {
    const kitChurrasqueiraOpcao = this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO');


    if((this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S' || this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') && kitChurrasqueiraOpcao == 5) {
      div.innerHTML += `
        <br>
        <b>ÁREA DE SERVIÇO & TERRAÇO:</b><br>
      `;

      if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S') {
        div.innerHTML += `
          <b>Kit Churrasqueira – Opção:</b> Já Comprado<br>
        `;
      }
      else if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') {
        div.innerHTML += `
          <b>Kit Churrasqueira – Opção:</b> Quero Comprar<br>
          <b>Kit Churrasqueira – Preço:</b> ${this.convertPrice(8873.51)} <br>
        `;
      }

      div.innerHTML += `
        <b>Bancada Tipo - Opção:</b> ${kitChurrasqueiraOpcao} - Bancada única com Tanque e Kit Churrasqueira 472 x 60cm <br>
        <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA - NOME DA OPÇÃO')} cm <br>
        <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA - PREÇO'))} <br><br>
      `;
    }
  }

  setTerraco(div: any, currentPersonalization: any) {

    const kitChurrasqueiraOpcao = Number(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO'))

    div.innerHTML += `
      <b>TERRAÇO:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO')} - ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO - NOME DA OPÇÃO')} cm <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - TERRAÇO - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - TERRAÇO - RODAPÉ') == 'S') {
      div.innerHTML += `
      <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - TERRAÇO - RODAPÉ - PREÇO'))} <br>
      `;
    }

    if(this.getValue(currentPersonalization, 'PAREDE - TERRAÇO') != null) {
      div.innerHTML += `
      <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - TERRAÇO')} - ${this.getValue(currentPersonalization, 'PAREDE - TERRAÇO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PAREDE - TERRAÇO - NOME DA OPÇÃO')} cm <br>
      <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - TERRAÇO - PREÇO'))} <br>
      `;
    }
    else {
      div.innerHTML += `
        <b>Revestimento Parede:</b> Sem Revestimento <br>
      `;
    }

    // YES KIT CHURRASQUEIRA
    if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S' || this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') {


      if(kitChurrasqueiraOpcao != 5) {
        if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S') {
          div.innerHTML += `
            <b>Kit Churrasqueira – Opção:</b> Já Comprado<br>
          `;
        }
        else if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') {
          div.innerHTML += `
            <b>Kit Churrasqueira – Opção:</b> Quero Comprar<br>
            <b>Kit Churrasqueira – Preço:</b> ${this.convertPrice(8873.51)} <br>
          `;
        }
        div.innerHTML += `
          <b>Área De Serviço E Terraço - Opção:</b> ${kitChurrasqueiraOpcao} - Personalizado <br>
        `;
      }
      if(kitChurrasqueiraOpcao == 3) {
        div.innerHTML += `
          <b>Bancada - Opção: </b> Bancada Kit Churrasqueira 210 x 60cm<br>
        `
      }


      if(kitChurrasqueiraOpcao == 3 || kitChurrasqueiraOpcao == 4) {
        div.innerHTML += `

          <b>Revestimento bancada Kit Churrasqueira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA - NOME DA OPÇÃO')} cm <br>
          <b>Revestimento bancada Kit Churrasqueira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA - PREÇO'))} <br>
        `;
      }

      if(kitChurrasqueiraOpcao == 4 || kitChurrasqueiraOpcao == 5 || kitChurrasqueiraOpcao == 3) {
        div.innerHTML += `
          <b>Cuba Kit Churrasqueira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - CUBA KIT CHURRASQUEIRA')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - CUBA KIT CHURRASQUEIRA - NOME DA OPÇÃO')} cm <br>
          <b>Cuba Kit Churrasqueira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - CUBA KIT CHURRASQUEIRA - PREÇO'))} <br>
        `;
      }

      div.innerHTML += `
        <b>Torneira Kit Churrasqueira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA')} - ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA - NOME DA OPÇÃO')} <br>
        <b>Torneira Kit Churrasqueira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA - PREÇO'))} <br>
      `;
    }
    // NO KIT CHURRASQUEIRA
    else {
      div.innerHTML += `
        <b>Área De Serviço E Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO')} - ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '1' ? 'Padrão' : 'Personalizado'} <br>
        <b>Terraço Sem Bancada / Kit Churrasqueira</b><br>
      `;

    }

    div.innerHTML += `
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br><br>
    `;
  }

  setEstar(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>ESTAR / JANTAR / CIRC.:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - ATIVADO') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC.')} - ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC.') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - NOME DA OPÇÃO')} cm <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - RODAPE') == 'S' ? 'Sim' : 'Sem'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete - Estar / Terraço:</b> ${this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Estar / Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO')} - ${this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - NOME DA OPÇÃO')} cm <br>
        <b>Baguete - Estar / Terraço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - PREÇO'))} <br>
      `;
    }
  }

  setLavabo(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>LAVABO:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - LAVABO')} - ${this.getValue(currentPersonalization, 'PISOS - LAVABO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - LAVABO - NOME DA OPÇÃO')} cm <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - LAVABO - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - LAVABO - RODAPE') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - LAVABO - RODAPE') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - LAVABO - RODAPE - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bancada Tipo - Opção:</b> ${this.getValue(currentPersonalization, 'LAVABO - BANCADA TIPO')} - ${this.getValue(currentPersonalization, 'LAVABO - BANCADA TIPO - NOME DA OPÇÃO')} cm <br>
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA')} - ${this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA') <= 1 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA - PREÇO'))} <br>
      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'LAVABO - TORNEIRA')} - ${this.getValue(currentPersonalization, 'LAVABO - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'LAVABO - TORNEIRA - PREÇO'))} <br>
      <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - LAVABO')} - ${this.getValue(currentPersonalization, 'BAGUETE - LAVABO - NOME DA OPÇÃO')} cm <br>
      <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - LAVABO - PREÇO'))} <br>
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;
  }

  setSuite1(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>SUÍTE 1:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>

    `;

    if(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1')} - ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - NOME DA OPÇÃO')} cm <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - RODAPE') == 'S' ? 'Sim' : 'Sem'} <br>
      `

      if(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1')} - ${this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - NOME DA OPÇÃO')} cm <br>
        <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - PREÇO'))} <br>
      `;
    }

  }

  setSuite2(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>SUÍTE 2:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO')} - ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO')} cm <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S' ? 'Sim' : 'Sem'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1')} - ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - NOME DA OPÇÃO')} cm <br>
        <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - PREÇO'))} <br>
      `;
    }

  }

  setBanho1(div: any, currentPersonalization: any, area: any) {
    div.innerHTML += `
      <br>
      <b>BANHO 1:</b><br>
      <b>Pisos Banheiro - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1')} - ${this.getValue(currentPersonalization, 'PISOS - BANHO 1') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - NOME DA OPÇÃO')} cm <br>
      <b>Pisos Banheiro - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - PREÇO'))} <br>
      <b>Rodapé Banheiro:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé Banheiro - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - RODAPÉ - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Pisos Box - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX')} - ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX - NOME DA OPÇÃO')} cm <br>
      <b>Pisos Box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX - PREÇO'))} <br>
      <b>Rodapé Box:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé Box- Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - BOX - RODAPÉ - PREÇO'))} <br>
      `;
    }

    if(area < 100) {
      div.innerHTML += `
        <b>Bancada - Opção:</b> Modelo Padrão 70x51 cm, Saia 4 cm, Frontão 7 cm <br>
      `
    }
    if(area >= 100) {
      div.innerHTML += `
        <b>Bancada - Opção:</b> Modelo Padrão 70x51 cm, Saia 4 cm, Frontão 7 cm <br>
      `
    }

    div.innerHTML += `
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA')} - ${this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA') <= 1 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA - PREÇO'))} <br>

      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - TORNEIRA')} - ${this.getValue(currentPersonalization, 'BANHO 1 - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - TORNEIRA - PREÇO'))} <br>

      <b>Revestimento Parede:</b> ${this.getValue(currentPersonalization, 'PAREDE - COMPLETO OU SOMENTE O BOX') == 'SB' ? 'Padrão - Somente Box' : 'Completo'} <br>
      <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - BANHO 1')} - ${this.getValue(currentPersonalization, 'PAREDE - BANHO 1') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PAREDE - BANHO 1 - NOME DA OPÇÃO')} cm <br>
      <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - BANHO 1 - PREÇO'))} <br>

      <b>Ducha - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - DUCHA')} - ${this.getValue(currentPersonalization, 'BANHO 1 - DUCHA - NOME DA OPÇÃO')} <br>

    `;

    if(this.getValue(currentPersonalization, 'BANHO 1 - DUCHA') > 1) {
      div.innerHTML += `
        <b>Ducha - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - DUCHA - PREÇO'))} <br>
      `
    }

    div.innerHTML += `
      <b>Box - Vidro:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - BOX DE VIDRO') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BANHO 1 - BOX DE VIDRO') == 'S') {
      div.innerHTML += `
        <b>Perfil de alumínio - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - PERFIL DE ALUMÍNIO')} - ${this.getValue(currentPersonalization, 'BANHO 1 - PERFIL DE ALUMÍNIO - NOME DA OPÇÃO')} <br>
        <b>Perfil de alumínio - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - PERFIL DE ALUMÍNIO - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bit box - Opção:</b> ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 1')} - ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 1 - NOME DA OPÇÃO')} cm<br>
      <b>Bit box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BIT BOX - BANHO 1 - PREÇO'))} <br>

      <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 1')} - ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 1 - NOME DA OPÇÃO')} cm <br>
      <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - BANHO 1 - PREÇO'))} <br>
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;


  }

  setBanho2(div: any, currentPersonalization: any, area: any) {
    div.innerHTML += `
      <br>
      <b>BANHO 2:</b><br>
      <b>Pisos Banheiro - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2')} - ${this.getValue(currentPersonalization, 'PISOS - BANHO 2') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - NOME DA OPÇÃO')} cm <br>
      <b>Pisos Banheiro - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - PREÇO'))} <br>
      <b>Rodapé Banheiro:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé Banheiro - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - RODAPÉ - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Pisos Box - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX')} - ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX - NOME DA OPÇÃO')} cm <br>
      <b>Pisos Box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX - PREÇO'))} <br>
      <b>Rodapé Box:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX - RODAPÉ') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé Box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - BOX - RODAPÉ - PREÇO'))} <br>
      `;
    }

    if(area < 100) {
      div.innerHTML += `
        <b>Bancada Tipo:</b> Modelo Padrão 85x53 cm, Saia 4 cm, Frontão 7 cm <br>
      `
    }
    if(area >= 100) {
      div.innerHTML += `
        <b>Bancada Tipo:</b> Modelo Padrão 70x51 cm, Saia 4 cm, Frontão 7 cm <br>
      `
    }

    div.innerHTML += `
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA')} - ${this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA') <= 1 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA - PREÇO'))} <br>

      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - TORNEIRA')} - ${this.getValue(currentPersonalization, 'BANHO 2 - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - TORNEIRA - PREÇO'))} <br>

      <b>Revestimento Parede:</b> ${this.getValue(currentPersonalization, 'PAREDE - COMPLETO OU SOMENTE O BOX') == 'SB' ? 'Padrão - Somente Box' : 'Completo'} <br>
      <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - BANHO 2')} - ${this.getValue(currentPersonalization, 'PAREDE - BANHO 2') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PAREDE - BANHO 2 - NOME DA OPÇÃO')} cm <br>
      <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - BANHO 2 - PREÇO'))} <br>

      <b>Ducha - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - DUCHA')} - ${this.getValue(currentPersonalization, 'BANHO 2 - DUCHA - NOME DA OPÇÃO')} <br>
    `;

    if(this.getValue(currentPersonalization, 'BANHO 2 - DUCHA') > 1) {
      div.innerHTML += `
        <b>Ducha - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - DUCHA - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Box - Vidro:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - BOX DE VIDRO') == 'S' ? 'Sim' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BANHO 2 - BOX DE VIDRO') == 'S') {
      div.innerHTML += `
        <b>Perfil de alumínio - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - PERFIL DE ALUMÍNIO')} - ${this.getValue(currentPersonalization, 'BANHO 2 - PERFIL DE ALUMÍNIO - NOME DA OPÇÃO')} <br>
        <b>Perfil de alumínio - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - PERFIL DE ALUMÍNIO - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bit box - Opção:</b> ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 2')} - ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 2 - NOME DA OPÇÃO')} cm <br>
      <b>Bit box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BIT BOX - BANHO 2 - PREÇO'))} <br>

      <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 2')} - ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 2 - NOME DA OPÇÃO')} cm <br>
      <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - BANHO 2 - PREÇO'))} <br>
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;


  }

  setDorm1(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>DORM. 1:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO')} - ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO')} cm <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S' ? 'Sim' : 'Sem'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1')} - ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - NOME DA OPÇÃO')} cm <br>
        <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - PREÇO'))} <br>
      `;
    }
  }

  setDorm2(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>DORM. 2:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO')} - ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO') <= 3 ? 'Padrão -' : 'Personalizado -'} ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO')} cm  <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S' ? 'Sim' : 'Sem'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Sem'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1')} - ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - NOME DA OPÇÃO')} cm <br>
        <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - PREÇO'))} <br>
      `;
    }
  }

  getValue(arr: any, key: any) {
    for(let i=0; i<arr.length; i++) {
      if(arr[i].key == key) {
        return arr[i].value;
      }
    }
    return '';
  }

  convertPrice(price: any) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formatter.format(price);
  }
}
