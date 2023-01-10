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
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - COZINHA')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - COZINHA - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - COZINHA - PREÇO'))} <br>
      <b>Rodapé:</b> ${ this.getValue(currentPersonalization, 'PISOS - COZINHA - RODAPÉ') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - COZINHA - RODAPÉ') == 'S') {
        div.innerHTML += `
            <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - COZINHA - RODAPÉ - PREÇO'))} <br>
        `;
    }

    if(this.getValue(currentPersonalization, 'PAREDE - COZINHA - SIM')?.trim() == '') {
        div.innerHTML += `
            <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - COZINHA')} <br>
            <b>Revestimento Parede - Especificação:</b> ${this.getValue(currentPersonalization, 'PAREDE - COZINHA - NOME DA OPÇÃO')} <br>
            <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - COZINHA - PREÇO'))} <br>
        `;
    }
    else {
        div.innerHTML += `
            <b>Revestimento Parede:</b> Sem Revestimento <br>
        `;
    }

    div.innerHTML += `
        <b>Bancada Tipo - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - BANCADA TIPO')} <br>
        <b>Bancada Tipo - Especificação:</b> ${this.getValue(currentPersonalization, 'COZINHA - BANCADA TIPO - NOME DA OPÇÃO')} <br>
        <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA')} <br>
        <b>Revestimento Bancada - Especificação:</b> ${this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
        <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'COZINHA - REVESTIMENTO BANCADA - PREÇO'))} <br>
        <b>Cuba - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - CUBA')} <br>
        <b>Cuba - Especificação:</b> ${this.getValue(currentPersonalization, 'COZINHA - CUBA - NOME DA OPÇÃO')} <br>
        <b>Cuba - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'COZINHA - CUBA - PREÇO'))} <br>
        <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'COZINHA - TORNEIRA')} <br>
        <b>Torneira - Especificação:</b> ${this.getValue(currentPersonalization, 'COZINHA - TORNEIRA - NOME DA OPÇÃO')} <br>
        <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'COZINHA - TORNEIRA - PREÇO'))} <br>
        <b>Bitbox - Cozinha / Área De Serviço:</b> ${this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - ATIVADO') == 'S' ? 'Sim' : 'Não'} <br>
    `;
    console.log(this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - ATIVADO') );
    if(this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - ATIVADO') == 'S') {
        div.innerHTML += `
            <b>Bitbox - Cozinha / Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO')} <br>
            <b>Bitbox - Cozinha / Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
            <b>Bitbox - Cozinha / Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BITBOX - COZINHA / ÁREA DE SERVIÇO - PREÇO'))} <br><br>
        `;
    }
  }

  setAreaServico(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>ÁREA DE SERVIÇO:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - RODAPÉ') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ÁREA DE SERVIÇO - RODAPÉ - PREÇO'))} <br>
      `;
    }

    if(this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO - SIM')?.trim() == '') {
      div.innerHTML += `
        <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO')} <br>
        <b>Revestimento Parede - Especificação:</b> ${this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
        <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - ÁREA DE SERVIÇO - PREÇO'))} <br>

        <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
      `;
    }
    else {
      div.innerHTML += `
        <b>Revestimento Parede:</b> Sem Revestimento <br>
      `;
    }

    div.innerHTML += `
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;

    if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'N') {
      div.innerHTML += `
        <b>Área De Serviço E Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO')} <br>
        <b>Área De Serviço E Terraço - Especificação:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO - NOME DA OPÇÃO')} <br>
      `;

      if(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '2') {
        div.innerHTML += `
          <b>Revestimento bancada Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO')} <br>
          <b>Revestimento bancada Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Revestimento bancada Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - PREÇO'))} <br>

          <b>Tanque Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO')} <br>
          <b>Tanque Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Tanque Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }

      div.innerHTML += `
        <b>Torneira Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO')} <br>
        <b>Torneira Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
        <b>Torneira Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - PREÇO'))} <br><br>
      `;
    }
    else if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S' || this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') {
      div.innerHTML += `
        <b>Área De Serviço E Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO')} <br>
        <b>Área De Serviço E Terraço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO - NOME DA OPÇÃO')} <br>
      `;

      if(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '4') {
        div.innerHTML += `
          <b>Revestimento bancada Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO')} <br>
          <b>Revestimento bancada Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Revestimento bancada Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - PREÇO'))} <br>

          <b>Tanque Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO')} <br>
          <b>Tanque Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Tanque Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }

      div.innerHTML += `
        <b>Torneira Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO')} <br>
        <b>Torneira Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
        <b>Torneira Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - PREÇO'))} <br><br>
      `;
    }
  }

  setTerraco(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>TERRAÇO:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - TERRAÇO - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - TERRAÇO - RODAPÉ') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - TERRAÇO - RODAPÉ') == 'S') {
      div.innerHTML += `
      <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - TERRAÇO - RODAPÉ - PREÇO'))} <br>
      `;
    }

    if(this.getValue(currentPersonalization, 'PAREDE - TERRAÇO - SIM')?.trim() == '') {
      div.innerHTML += `
      <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - TERRAÇO')} <br>
      <b>Revestimento Parede - Especificação:</b> ${this.getValue(currentPersonalization, 'PAREDE - TERRAÇO - NOME DA OPÇÃO')} <br>
      <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - TERRAÇO - PREÇO'))} <br>
      `;
    }
    else {
      div.innerHTML += `
      <b>Revestimento Parede:</b> Sem Revestimento <br>
      `;
    }

    div.innerHTML += `
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;

    if(this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'S' || this.getValue(currentPersonalization, 'KIT CHURRASQUEIRA') == 'C') {
      div.innerHTML += `
        <b>Área De Serviço E Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO')} <br>
        <b>Área De Serviço E Terraço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO - NOME DA OPÇÃO')} <br>
      `;

      if(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '3' || this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '4') {
        div.innerHTML += `
          <b>Revestimento bancada Kit Churrasqueira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA')} <br>
          <b>Revestimento bancada Kit Churrasqueira - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA - NOME DA OPÇÃO')} <br>
          <b>Revestimento bancada Kit Churrasqueira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA - PREÇO'))} <br>
        `;
      }


      if(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '5') {
        div.innerHTML += `
          <b>Revestimento bancada única - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA')} <br>
          <b>Revestimento bancada única - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA - NOME DA OPÇÃO')} <br>
          <b>Revestimento bancada única - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA - PREÇO'))} <br>

          <b>Tanque Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO')} <br>
          <b>Tanque Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Tanque Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - PREÇO'))} <br>

          <b>Torneira Área De Serviço - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO')} <br>
          <b>Torneira Área De Serviço - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Torneira Área De Serviço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }

      if(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '4' || this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO') == '5') {
        div.innerHTML += `
          <b>Cuba Kit Churrasqueira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO')} <br>
          <b>Cuba Kit Churrasqueira - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO')} <br>
          <b>Cuba Kit Churrasqueira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - PREÇO'))} <br>
        `;
      }

      div.innerHTML += `
        <b>Torneira Kit Churrasqueira - Opção:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA')} <br>
        <b>Torneira Kit Churrasqueira - Especificação:</b> ${this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA - NOME DA OPÇÃO')} <br>
        <b>Torneira Kit Churrasqueira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA - PREÇO'))} <br><br>
      `;
    }
    else {
      div.innerHTML += '<br>';
    }
  }

  setEstar(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>ESTAR / JANTAR / CIRC.:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - ATIVADO') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC.')} <br>
        <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - NOME DA OPÇÃO')} <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - RODAPE') == 'S' ? 'Sim' : 'Não'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - ESTAR / JANTAR / CIRC. - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete - Estar / Terraço:</b> ${this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Estar / Terraço - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO')} <br>
        <b>Baguete - Estar / Terraço - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - NOME DA OPÇÃO')} <br>
        <b>Baguete - Estar / Terraço - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - ESTAR / TERRAÇO - PREÇO'))} <br>
      `;
    }
  }

  setLavabo(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>LAVABO:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - LAVABO')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - LAVABO - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - LAVABO - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - LAVABO - RODAPE') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - LAVABO - RODAPE') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - LAVABO - RODAPE - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bancada Tipo - Opção:</b> ${this.getValue(currentPersonalization, 'LAVABO - BANCADA TIPO')} <br>
      <b>Bancada Tipo - Especificação:</b> ${this.getValue(currentPersonalization, 'LAVABO - BANCADA TIPO - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA')} <br>
      <b>Revestimento Bancada - Especificação:</b> ${this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'LAVABO - REVESTIMENTO BANCADA - PREÇO'))} <br>
      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'LAVABO - TORNEIRA')} <br>
      <b>Torneira - Especificação:</b> ${this.getValue(currentPersonalization, 'LAVABO - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'LAVABO - TORNEIRA - PREÇO'))} <br>
      <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - LAVABO')} <br>
      <b>Baguete - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - LAVABO - NOME DA OPÇÃO')} <br>
      <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - LAVABO - PREÇO'))} <br>
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;
  }

  setSuite1(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>SUÍTE 1:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - RODAPE') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - RODAPE') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - SUÍTE 1 - RODAPE - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1')} <br>
        <b>Baguete - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - NOME DA OPÇÃO')} <br>
        <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - SUÍTE 1 - PREÇO'))} <br>
      `;
    }


  }

  setBanho1(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>BANHO 1:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 1 - RODAPÉ') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 1 - RODAPÉ - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bancada Tipo - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - BANCADA TIPO - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA')} <br>
      <b>Revestimento Bancada - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - REVESTIMENTO BANCADA - PREÇO'))} <br>

      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - TORNEIRA')} <br>
      <b>Torneira - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - TORNEIRA - PREÇO'))} <br>

      <b>Revestimento Parede:</b> ${this.getValue(currentPersonalization, 'PAREDE - COMPLETO OU SOMENTE O BOX') == 'SB' ? 'Somente Box' : 'Completo'} <br>
      <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - BANHO 1')} <br>
      <b>Revestimento Parede - Especificação:</b> ${this.getValue(currentPersonalization, 'PAREDE - BANHO 1 - NOME DA OPÇÃO')} <br>
      <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - BANHO 1 - PREÇO'))} <br>

      <b>Ducha - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - DUCHA')} <br>
      <b>Ducha - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - DUCHA - NOME DA OPÇÃO')} <br>
      <b>Ducha - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - DUCHA - PREÇO'))} <br>

      <b>Box - Vidro:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - BOX DE VIDRO') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BANHO 1 - BOX DE VIDRO') == 'S') {
      div.innerHTML += `
        <b>Perfil de alumínio - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - PERFIL DE ALUMÍNIO')} <br>
        <b>Perfil de alumínio - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 1 - PERFIL DE ALUMÍNIO - NOME DA OPÇÃO')} <br>
        <b>Perfil de alumínio - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 1 - PERFIL DE ALUMÍNIO - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bit box - Opção:</b> ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 1')} <br>
      <b>Bit box - Especificação:</b> ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 1 - NOME DA OPÇÃO')} <br>
      <b>Bit box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BIT BOX - BANHO 1 - PREÇO'))} <br>

      <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 1')} <br>
      <b>Baguete - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 1 - NOME DA OPÇÃO')} <br>
      <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - BANHO 1 - PREÇO'))} <br>
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;


  }

  setBanho2(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>BANHO 2:</b><br>
      <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2')} <br>
      <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - NOME DA OPÇÃO')} <br>
      <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - PREÇO'))} <br>
      <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - BANHO 2 - RODAPÉ') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - RODAPÉ') == 'S') {
      div.innerHTML += `
        <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - BANHO 2 - RODAPÉ - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bancada Tipo - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - BANCADA TIPO - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA')} <br>
      <b>Revestimento Bancada - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA - NOME DA OPÇÃO')} <br>
      <b>Revestimento Bancada - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - REVESTIMENTO BANCADA - PREÇO'))} <br>

      <b>Torneira - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - TORNEIRA')} <br>
      <b>Torneira - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - TORNEIRA - NOME DA OPÇÃO')} <br>
      <b>Torneira - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - TORNEIRA - PREÇO'))} <br>

      <b>Revestimento Parede:</b> ${this.getValue(currentPersonalization, 'PAREDE - COMPLETO OU SOMENTE O BOX') == 'SB' ? 'Somente Box' : 'Completo'} <br>
      <b>Revestimento Parede - Opção:</b> ${this.getValue(currentPersonalization, 'PAREDE - BANHO 2')} <br>
      <b>Revestimento Parede - Especificação:</b> ${this.getValue(currentPersonalization, 'PAREDE - BANHO 2 - NOME DA OPÇÃO')} <br>
      <b>Revestimento Parede - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PAREDE - BANHO 2 - PREÇO'))} <br>

      <b>Ducha - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - DUCHA')} <br>
      <b>Ducha - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - DUCHA - NOME DA OPÇÃO')} <br>
      <b>Ducha - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - DUCHA - PREÇO'))} <br>

      <b>Box - Vidro:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - BOX DE VIDRO') == 'S' ? 'Sim' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BANHO 2 - BOX DE VIDRO') == 'S') {
      div.innerHTML += `
        <b>Perfil de alumínio - Opção:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - PERFIL DE ALUMÍNIO')} <br>
        <b>Perfil de alumínio - Especificação:</b> ${this.getValue(currentPersonalization, 'BANHO 2 - PERFIL DE ALUMÍNIO - NOME DA OPÇÃO')} <br>
        <b>Perfil de alumínio - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BANHO 2 - PERFIL DE ALUMÍNIO - PREÇO'))} <br>
      `;
    }

    div.innerHTML += `
      <b>Bit box - Opção:</b> ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 2')} <br>
      <b>Bit box - Especificação:</b> ${this.getValue(currentPersonalization, 'BIT BOX - BANHO 2 - NOME DA OPÇÃO')} <br>
      <b>Bit box - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BIT BOX - BANHO 2 - PREÇO'))} <br>

      <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 2')} <br>
      <b>Baguete - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - BANHO 2 - NOME DA OPÇÃO')} <br>
      <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - BANHO 2 - PREÇO'))} <br>
      <b>Acabamento Registro:</b> Padrão - Acabamento para Registro 1/2, 3/4 E 1 Pq Max-Cromado - Docol <br>
    `;


  }

  setDorm1(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>DORM. 1:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO')} <br>
        <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO')} <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S' ? 'Sim' : 'Não'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1')} <br>
        <b>Baguete - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - NOME DA OPÇÃO')} <br>
        <b>Baguete - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - PREÇO'))} <br>
      `;
    }
  }

  setDorm2(div: any, currentPersonalization: any) {
    div.innerHTML += `
      <br>
      <b>DORM. 2:</b><br>
      <b>Pisos:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Pisos - Opção:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO')} <br>
        <b>Pisos - Especificação:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO')} <br>
        <b>Pisos - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - PREÇO'))} <br>
        <b>Rodapé:</b> ${this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S' ? 'Sim' : 'Não'} <br>
      `;

      if(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - RODAPE') == 'S') {
        div.innerHTML += `
          <b>Rodapé - Preço:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - RODAPE - PREÇO'))} <br>
        `;
      }
    }

    div.innerHTML += `
      <b>Baguete:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S' ? 'Sim - Personalização' : 'Não'} <br>
    `;

    if(this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - ATIVADO') == 'S') {
      div.innerHTML += `
        <b>Baguete - Opção:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1')} <br>
        <b>Baguete - Especificação:</b> ${this.getValue(currentPersonalization, 'BAGUETE - DORM 1 - NOME DA OPÇÃO')} <br>
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
