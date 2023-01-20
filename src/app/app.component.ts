import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { ContractService } from './services/contract.service';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

declare const Office: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public submitted: any = [];

  constructor(
    private http: HttpClient,
    public contractService: ContractService
  ) {

  }

  handleFileSelect(event: any) {
    const fileToRead = event.target.files.item(0);
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      let content = fileReader.result as string;

      const csvData = Papa.parse(content, {
          header: true,
          dynamicTyping: true
      });
      const jsonData = csvData.data;

      this.processJSON(jsonData);
    };
    fileReader.readAsText(fileToRead);


  }

  processJSON(importJSON: any) {
    for(let i=0; i<importJSON.length; i++) {
      let personalization = importJSON[i];

      if(personalization['ENVIADO'] == true) {

        let currentPersonalization = [];
        for (let key in personalization) {
          currentPersonalization.push({key: key, value: personalization[key]});
        }

        this.submitted.push(
          {
            cpfCNPJ: this.getValue(currentPersonalization, 'CPF / CNPJ'),
            apartamento: this.getValue(currentPersonalization, 'APARTAMENTO'),
            client: this.getValue(currentPersonalization, 'NOME DO CLIENTE')
          }
        );

        const div = document.createElement("div");
        div.id = personalization['CPF / CNPJ'];
        div.classList.add('box');
        div.setAttribute('class', 'box');

        document.getElementById('content')?.appendChild(div);

        div.innerHTML += `
          <b>CLIENTE:</b> ${this.getValue(currentPersonalization, 'NOME DO CLIENTE')} <br>
          <b>CPF/CNPJ:</b> ${this.getValue(currentPersonalization, 'CPF / CNPJ')} <br>
          <b>UNIDADE:</b> ${this.getValue(currentPersonalization, 'APARTAMENTO')} <br>
          <b>ÁREA PRIV.:</b> ${this.getValue(currentPersonalization, 'ÁREA PRIV')} M<sup>2</sup> <br>
        `;

        if(Number(this.getValue(currentPersonalization, 'ÁREA PRIV')) >= 100) {
          div.innerHTML += `<b>TIPO:</b> ${this.getValue(currentPersonalization, 'TIPO') == 'Tipo 1' ? 'TIPO 1' : 'TIPO 2 - 3 dorms. - sendo 1 suite'} <br>`
        }

        this.contractService.setPISOS(div, currentPersonalization);
        this.contractService.setAreaServico(div, currentPersonalization);
        this.contractService.setTerraco(div, currentPersonalization);
        this.contractService.setEstar(div, currentPersonalization);
        this.contractService.setLavabo(div, currentPersonalization);
        this.contractService.setSuite1(div, currentPersonalization);
        this.contractService.setBanho1(div, currentPersonalization);
        this.contractService.setDorm1(div, currentPersonalization);
        this.contractService.setDorm2(div, currentPersonalization);
        this.contractService.setBanho2(div, currentPersonalization);

        div.innerHTML += `
            <br>
            <b>Total:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'TOTAL'))} <br>
            <b>Forma de pagamento:</b> ${this.getValue(currentPersonalization, 'FORMA DE PAGAMENTO')} <br>
        `;

      }


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

  download(client: any) {

    let title = client.client;
    let fileName = title + ".docx";
    let element = document.getElementById(client.cpfCNPJ);
    if(element) {

      let splitByBR = element.innerHTML.split('<br>');

      let children: any[] = [];
      splitByBR.forEach((el) => {
        if(el.trim().length > 0) {
          const trimmedEl = el.split('\n')[1].trim();

          const bold = trimmedEl.match(/<b>(.*?)<\/b>/);
          const text = trimmedEl.match(/<\/b>(.*)/);
          if(bold && text) {
           children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${bold[1]}\n`,
                  bold: true
                }),
                new TextRun({
                  text: `${text[1].replace(/&nbsp;/g, ' ')}`,
                })
              ]
            })
           )
          }
        }
        else {
          children.push(new Paragraph({}))
        }

      })

      const doc = new (Document as any)({
        sections: [{
            properties: {},
            children: children,
        }],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, fileName);
      })
    }

  }

  downloadAll() {

  }

  async insertDivIntoWord(content: string) {
    await Office.onReady();
    Office.context.document.setSelectedDataAsync(content, {coercionType: Office.CoercionType.Html});
  }


}
