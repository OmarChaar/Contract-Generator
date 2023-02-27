import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { ContractService } from './services/contract.service';
import { Document, ImageRun, Packer, Paragraph, SectionType, TextRun } from "docx";
import { saveAs } from 'file-saver';
import { ClientsService } from './services/clients.service';
import { DefaultsService } from './services/defaults.service';
import * as JSZip from 'jszip';

declare const Office: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public tempSubmitted: any = [];
  public submitted: any = [];

  public loading = false;

  constructor(
    public contractService: ContractService,
    private clientsService: ClientsService,
    private defaultsService: DefaultsService
  ) {}

  async urlToBlob(url: any) {
    return (await fetch(url)).blob();
  }

  handleFileSelect(event: any) {
    this.loading = true;
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
    let upload = document.getElementById('upload') as HTMLInputElement;
    upload.value = '';

  }

  public parsedClients: any;
  async processJSON(importJSON: any) {
    // this.setClients(importJSON);

    this.submitted = [];
    this.tempSubmitted = [];
    let allClients: any = await this.parseAll(importJSON);
    this.parsedClients = await this.parseAll(importJSON);

    const content = document.getElementById('content');
    if (content) {
      content.innerText = '';
    }

    for(let i=0; i<allClients.length; i++) {
      let personalization = allClients[i];
      // if(personalization['ENVIADO'] == true) {
      let currentPersonalization = [];
      for (let key in personalization) {
        currentPersonalization.push({key: key, value: personalization[key]});
      }

      const areaPriv = Number(this.getValue(currentPersonalization, 'ÁREA PRIV'));

      let tipo = '';

      this.submitted.push(
        {
          cpfCNPJ: this.getValue(currentPersonalization, 'CPF / CNPJ'),
          apartamento: this.getValue(currentPersonalization, 'APARTAMENTO'),
          client: this.getValue(currentPersonalization, 'NOME DO CLIENTE'),
          area: this.getValue(currentPersonalization, 'ÁREA PRIV'),
          tipo: this.getValue(currentPersonalization, 'TIPO') ? this.getValue(currentPersonalization, 'TIPO') : null,
          personalized: personalization.personalized
        }
      );

      this.submitted = this.submitted.sort((a: any, b: any) => {
        return a.apartamento - b.apartamento;
      })

      this.tempSubmitted = this.submitted;


      const div = document.createElement("div");
      div.id = personalization['CPF / CNPJ'];
      div.classList.add('box');
      div.setAttribute('class', 'box');

      document.getElementById('content')?.appendChild(div);

      div.innerHTML += `
        <b>CLIENTE:</b> ${this.getValue(currentPersonalization, 'NOME DO CLIENTE')} <br>
        <b>CPF/CNPJ:</b> ${this.getValue(currentPersonalization, 'CPF / CNPJ')} <br>
        <b>UNIDADE:</b> ${this.getValue(currentPersonalization, 'APARTAMENTO')} <br>
        <b>ÁREA PRIVATIVA:</b> ${this.getValue(currentPersonalization, 'ÁREA PRIV')} M² <br>
      `;

      if(areaPriv >= 100) {

        tipo = this.getValue(currentPersonalization, 'TIPO') == 'Tipo 1' ? 'TIPO 1' : 'TIPO 2';

        div.innerHTML += `<b>TIPO:</b> ${tipo == 'TIPO 1' ? 'Tipo 1 - 2 Suítes e Living ampliado' : 'TIPO 2 - 3 Dorms. - sendo 1 Suíte'} <br>`
      }

      div.innerHTML += `<br><b>Definições de Acabamentos:</b><br>`

      this.contractService.setPISOS(div, currentPersonalization);
      this.contractService.setAreaServico(div, currentPersonalization);
      this.contractService.setAreaServicoETerraco(div, currentPersonalization);

      this.contractService.setTerraco(div, currentPersonalization);

      this.contractService.setEstar(div, currentPersonalization);
      if(Number(areaPriv) >= 100) {
        this.contractService.setLavabo(div, currentPersonalization);
      }


      this.contractService.setSuite1(div, currentPersonalization);
      this.contractService.setBanho1(div, currentPersonalization, areaPriv);

      if(Number(areaPriv) >= 100 && tipo == 'TIPO 1') {
        this.contractService.setSuite2(div, currentPersonalization);
      }

      if((Number(areaPriv) >= 100 && tipo == 'TIPO 2') || Number(areaPriv) < 100) {
        this.contractService.setDorm1(div, currentPersonalization);
      }

      if(Number(areaPriv) >= 100 && tipo == 'TIPO 2') {
        this.contractService.setDorm2(div, currentPersonalization);
      }

      this.contractService.setBanho2(div, currentPersonalization, areaPriv);

      this.contractService.setLINHA(div, currentPersonalization);

      div.innerHTML += `
          <br>
          <b>Total:</b> ${this.convertPrice(this.getValue(currentPersonalization, 'TOTAL'))} <br>
      `;

      if(this.getValue(currentPersonalization, 'TOTAL') > 0) {
        div.innerHTML += `
          <b>Forma de pagamento:</b> ${this.getValue(currentPersonalization, 'FORMA DE PAGAMENTO')} <br>
        `
      }
      else {
        div.innerHTML += `
          <b>Forma de pagamento:</b> N/A <br>
        `
      }
    }

    this.loading = false;
  }

  parseAll(importJSON: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let parsed = [];
      for(let client of this.clientsService.clients) {

        parsed.push(this.checkClientSubmitted(client, importJSON));
      }

      for(let parse of parsed) {
        for(let key in parse) {
          if(parse[key] == '') {
            parse[key] = null
          }
        }
      }

      resolve(parsed);
    })
  }

  checkClientSubmitted(client: any, importJSON: any) {
    console.log("client", client);
    let tempClient = null;

    for(let i=0; i<importJSON.length; i++) {
      if(client.cpfCNPJ == importJSON[i]['CPF / CNPJ'] && client.apartamento == importJSON[i]['APARTAMENTO'] && importJSON[i]['ENVIADO'] == true) {
        tempClient = importJSON[i];
        tempClient['personalized'] = true;
        break;
      }
    }

    if(tempClient == null) {
      if(client.areaPriv == 100 && client.tipo == 'Tipo 1') {
        let temp = JSON.parse(JSON.stringify(this.defaultsService.default_100_tipo1));
        temp['CPF / CNPJ'] = client.cpfCNPJ;
        temp['NOME DO CLIENTE'] = client.client;
        temp['APARTAMENTO'] = client.apartamento;
        tempClient = temp;
      }
      else if(client.areaPriv == 100 && client.tipo == 'Tipo 2') {
        let temp = JSON.parse(JSON.stringify(this.defaultsService.default_100_tipo2));
        temp['CPF / CNPJ'] = client.cpfCNPJ;
        temp['NOME DO CLIENTE'] = client.client;
        temp['APARTAMENTO'] = client.apartamento;
        tempClient = temp;
      }
      else if(client.areaPriv == 124.21 && client.tipo == 'Tipo 1') {
        let temp = JSON.parse(JSON.stringify(this.defaultsService.default_124_tipo1));
        temp['CPF / CNPJ'] = client.cpfCNPJ;
        temp['NOME DO CLIENTE'] = client.client;
        temp['APARTAMENTO'] = client.apartamento;
        tempClient = temp;
      }
      else if(client.areaPriv == 124.21 && client.tipo == 'Tipo 2') {
        let temp = JSON.parse(JSON.stringify(this.defaultsService.default_124_tipo2));
        temp['CPF / CNPJ'] = client.cpfCNPJ;
        temp['NOME DO CLIENTE'] = client.client;
        temp['APARTAMENTO'] = client.apartamento;
        tempClient = temp;
      }
      else if(client.areaPriv == 70) {
        let temp = JSON.parse(JSON.stringify(this.defaultsService.default_70));
        temp['CPF / CNPJ'] = client.cpfCNPJ;
        temp['NOME DO CLIENTE'] = client.client;
        temp['APARTAMENTO'] = client.apartamento;
        tempClient = temp;
      }
      else if(client.areaPriv == 85.83) {
        let temp = JSON.parse(JSON.stringify(this.defaultsService.default_85));
        temp['CPF / CNPJ'] = client.cpfCNPJ;
        temp['NOME DO CLIENTE'] = client.client;
        temp['APARTAMENTO'] = client.apartamento;
        tempClient = temp;
      }


      tempClient['personalized'] = false;

    }
    return tempClient;
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

  downloadWithCallback(client: any) {
    this.download(client, (blob: Blob) => {
      // Handle the blob here
    });
  }

  async download(client: any, callback: (blob: Blob) => void) {
    let title = client.apartamento + '_' + client.client;
    let fileName = title + ".docx";
    let element = document.getElementById(client.cpfCNPJ);
    if (element) {
      let splitByBR = element.innerHTML.split('<br>');

      let children: any[] = [];
      for (const el of splitByBR) {
        if (el.trim().length > 0) {
          if(el.includes('Definições de Acabamentos')) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Definições de Acabamentos:\n`,
                    bold: true,
                  })
                ],
              })
            );
          }
          else {
            const trimmedEl = el.trim();

            const bold = trimmedEl.match(/<b>(.*?)<\/b>/);
            const text = trimmedEl.match(/<\/b>(.*)/);
            if (bold && text) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${bold[1]}`,
                      bold: true,
                    }),
                    new TextRun({
                      text: `${text[1].replace(/&nbsp;/g, ' ')}`,
                    })
                  ],
                })
              );
            }
          }
        } else {
          children.push(new Paragraph({}));
        }
      };

      const plans = await this.addPlans(client);

      const doc = new (Document as any)({
        sections: [
          {
            properties: {},
            children: children,
          },
          {
            properties: {
              type: SectionType.NEXT_PAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: plans,
                    transformation: {
                      width: (8.27 * 72 * 1.334),
                      height: (11.69 * 72 * 1.334),
                    },
                    floating: {
                      horizontalPosition: {
                        offset: 0,
                      },
                      verticalPosition: {
                        offset: 0,
                      },
                    },
                  })
                ],
              })
            ]
          }
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        callback(blob);
      });
    }
  }

  async downloadSingle(client: any) {

    let title = client.apartamento + '_' + client.client;
    let fileName = title + ".docx";
    let element = document.getElementById(client.cpfCNPJ);
    if (element) {
      let splitByBR = element.innerHTML.split('<br>');
      let children: any[] = [];
      for (const el of splitByBR) {
        if (el.trim().length > 0) {
          if(el.includes('Definições de Acabamentos')) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Definições de Acabamentos:\n`,
                    bold: true,
                  })
                ],
              })
            );
          }
          else {
            const trimmedEl = el.trim();

            const bold = trimmedEl.match(/<b>(.*?)<\/b>/);
            const text = trimmedEl.match(/<\/b>(.*)/);
            if (bold && text) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${bold[1]}`,
                      bold: true,
                    }),
                    new TextRun({
                      text: `${text[1].replace(/&nbsp;/g, ' ')}`,
                    }),

                  ],
                })
              );
            }
          }

        } else {
          children.push(new Paragraph({}));
        }
      };


      const plans = await this.addPlans(client);

      const doc = new (Document as any)({
        sections: [
          {
            properties: {},
            children: children,
          },
          {
            properties: {
              type: SectionType.NEXT_PAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: plans,
                    transformation: {
                      width: (8.27 * 72 * 1.334),
                      height: (11.69 * 72 * 1.334),
                    },
                    floating: {
                      horizontalPosition: {
                        offset: 0,
                      },
                      verticalPosition: {
                        offset: 0,
                      },
                    },
                  })
                ],
              })
            ]
          }
        ]
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, fileName);
      });
    }
  }

  async addPlans(client: any){
    // console.log("client", client);
    let planBlob: any;

    const aptEnding = client.apartamento.toString();
    const lastChar = aptEnding.charAt(aptEnding.length - 1);

    // Not the first floor
    if(client.apartamento > 19) {
      if(lastChar == '1') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo1_apt1.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo2_apt1.jpg');
        }
      }
      else if(lastChar == '2') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo1_apt2.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo2_apt2.jpg');
        }
      }
      else if(lastChar == '3') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/70_apt3.jpg');
      }
      else if(lastChar == '4') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/70_apt4.jpg');
      }
      else if(lastChar == '5') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/70_apt5.jpg');
      }
      else if(lastChar == '6') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/70_apt6.jpg');
      }
      else if(lastChar == '7') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo1_apt7.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo2_apt7.jpg');
        }
      }
      else if(lastChar == '8') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo1_apt8.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo2_apt8.jpg');
        }
      }
    }
    else {
      if(lastChar == '1') {
        planBlob = await this.urlToBlob('../assets/imgs/und.11.jpg');
      }
      else if(lastChar == '2') {
        planBlob = await this.urlToBlob('../assets/imgs/und.12.jpg');
      }
      else if(lastChar == '3') {
        planBlob = await this.urlToBlob('../assets/imgs/und.13.jpg');
      }
      else if(lastChar == '4') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/70_apt4.jpg');
      }
      else if(lastChar == '5') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/und.15.jpg');
      }
      else if(lastChar == '6') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/70_apt6.jpg');
      }
      else if(lastChar == '7') {
        // area: 128
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo1_apt7.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo2_apt7.jpg');
        }
      }
      else if(lastChar == '8') {
        // area: 128
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo1_apt8.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/100_tipo2_apt8.jpg');
        }
      }
    }



    let planArrayBuffer = await planBlob.arrayBuffer();

    return planArrayBuffer;

  }

  downloadAll() {
    this.loading = true;

    const zip = new JSZip();
    const promises = [];

    for (let client of this.submitted) {
      const title = client.apartamento + '_' + client.client;
      const fileName = title + ".docx";

      promises.push(
        new Promise((resolve) => {
          this.download(client, (blob) => {
            zip.file(fileName, blob);
            resolve(true);
          });
        })
      );
    }

    Promise.all(promises).then(() => {
      zip.generateAsync({ type: 'blob' }).then((blob: any) => {
        saveAs(blob, 'download.zip');
        this.loading = false;
      });
    });
  }

  async insertDivIntoWord(content: string) {
    await Office.onReady();
    Office.context.document.setSelectedDataAsync(content, {coercionType: Office.CoercionType.Html});
  }

  search(event: any) {

    if(event.target.value.length > 0) {
      this.submitted = this.tempSubmitted.filter((el: any) => {
        return String(el.client).toLowerCase().indexOf(event.target.value) > -1 || String(el.cpfCNPJ).toLowerCase().indexOf(event.target.value) > -1 || String(el.apartamento).toLowerCase().indexOf(event.target.value) > -1;
      });
    }
    else {
      this.submitted =  this.tempSubmitted;
    }

  }

  show(id: any) {
    document.querySelectorAll('.box').forEach((box) => {
      box.classList.remove('show');
      document.getElementById('show_'+box.id)?.classList.remove('hidden');
      document.getElementById('hide_'+box.id)?.classList.add('hidden');
    })
    if(document.getElementById(id)) {
      document.getElementById(id)?.classList.add('show');
      document.getElementById('show_'+id)?.classList.add('hidden');
      document.getElementById('hide_'+id)?.classList.remove('hidden');
    }

  }

  hide(id: any) {
    if(document.getElementById(id)) {
      document.getElementById(id)?.classList.remove('show');
      document.getElementById('show_'+id)?.classList.remove('hidden');
      document.getElementById('hide_'+id)?.classList.add('hidden');
    }
  }

  showAll() {
    document.getElementById('showAll')?.classList.add('hidden');
    document.getElementById('hideAll')?.classList.remove('hidden');
    document.querySelectorAll('.box').forEach((box) => {
      box.classList.add('show');
      document.getElementById('show_'+box.id)?.classList.add('hidden');
      document.getElementById('hide_'+box.id)?.classList.remove('hidden');
    })
  }

  hideAll() {
    document.getElementById('showAll')?.classList.remove('hidden');
    document.getElementById('hideAll')?.classList.add('hidden');
    document.querySelectorAll('.box').forEach((box) => {
      box.classList.remove('show');
      document.getElementById('show_'+box.id)?.classList.remove('hidden');
      document.getElementById('hide_'+box.id)?.classList.add('hidden');
    })
  }

  async generateCVS() {
    this.loading = true;

    let pisosArray = [];
    let paredeArray = [];
    let baguetesArray = [];
    let bancadasArray = [];
    let metaisArray = [];
    let cubasTanqueArray = [];
    let linhaArray = [];
    let vidroArray = [];

    for(let personalization of this.parsedClients) {
      pisosArray.push(this.setPISOS(personalization));
      paredeArray.push(this.setParedes(personalization));
      bancadasArray.push(this.setBancadas(personalization));
      metaisArray.push(this.setMetais(personalization));
      cubasTanqueArray.push(this.setCubas(personalization));
      baguetesArray.push(this.setBaguete(personalization));
      linhaArray.push(this.setLinha(personalization));
      vidroArray.push(this.setVidro(personalization));

      // const pisosObj = await this.setObjs("PISOS", personalization);
      // pisosArray.push(pisosObj);

      // const paredeObj = await this.setObjs("PAREDE", personalization);
      // paredeArray.push(paredeObj);
    }

    await this.exportToCsv(this.sortByUnidade(pisosArray), 'Pisos');
    await this.exportToCsv(this.sortByUnidade(paredeArray), 'Parede');
    await this.exportToCsv(this.sortByUnidade(bancadasArray), 'Bancadas');
    await this.exportToCsv(this.sortByUnidade(metaisArray), 'Metais');
    await this.exportToCsv(this.sortByUnidade(cubasTanqueArray), 'Cubas');
    await this.exportToCsv(this.sortByUnidade(baguetesArray), 'Baguete');
    await this.exportToCsv(this.sortByUnidade(linhaArray), 'Linha');
    await this.exportToCsv(this.sortByUnidade(vidroArray), 'Vidro');

    this.loading = false;

  }

  sortByUnidade(arr: any) {
    return arr.sort((a: any, b: any) => {
      return (a['UNIDADE'] - b['UNIDADE']);
    })
  }

  setObjs(type: any, personalization: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let tempObj: any = {
        "UNIDADE": personalization['APARTAMENTO'],
        "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
        "TIPO": personalization['TIPO']
      };
      for (let key in personalization) {
        if(type == "PISOS" && key.includes(type) && key.includes("RODAPÉ") && !key.includes("RODAPÉ - PREÇO") ) {
          tempObj[key] = personalization[key];
        }

        if(type == "PISOS" && key.includes(type) && key.includes("PISOS - EXTRA")) {
          tempObj['ESTAR / JANTAR / CIRC. - EXTRA'] = personalization[key];
        }

        if(key.includes(type) && key.includes("NOME DA OPÇÃO")) {
          tempObj[key.replace(" - NOME DA OPÇÃO", '')] = personalization[key];
        }
      }

      resolve(tempObj);
    })
  }

  setPISOS(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['PISOS - COZINHA'] = personalization['PISOS - COZINHA - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - COZINHA'] = personalization['PISOS - COZINHA - RODAPÉ'];
    tempObj['PISOS - ÁREA DE SERVIÇO'] = personalization['PISOS - ÁREA DE SERVIÇO - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - ÁREA DE SERVIÇO'] = personalization['PISOS - ÁREA DE SERVIÇO - RODAPÉ'];
    tempObj['PISOS - TERRAÇO'] = personalization['PISOS - TERRAÇO - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - TERRAÇO'] = personalization['PISOS - TERRAÇO - RODAPÉ'];
    tempObj['PISOS - EXTRA'] = personalization['PISOS - EXTRA'];
    tempObj['PISOS - ESTAR / JANTAR / CIRC.'] = personalization['PISOS - ESTAR / JANTAR / CIRC. - NOME DA OPÇÃO'];
    tempObj['RODAPE - ESTAR / JANTAR / CIRC.'] = personalization['PISOS - ESTAR / JANTAR / CIRC. - RODAPE'];
    tempObj['PISOS - LAVABO'] = personalization['PISOS - LAVABO - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - LAVABO'] = personalization['PISOS - LAVABO - RODAPÉ'];
    tempObj['PISOS - BANHO 1'] = personalization['PISOS - BANHO 1 - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - BANHO 1'] = personalization['PISOS - BANHO 1 - RODAPÉ'];
    tempObj['PISOS - BOX BANHO 1'] = personalization['PISOS - BANHO 1 - BOX - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - BOX BANHO 1'] = personalization['PISOS - BANHO 1 - BOX - RODAPÉ'];
    tempObj['PISOS - BANHO 2'] = personalization['PISOS - BANHO 2 - NOME DA OPÇÃO'];
    tempObj['RODAPÉ - BANHO 2'] = personalization['PISOS - BANHO 2 - RODAPÉ'];
    tempObj['PISOS BOX - BANHO 2'] = personalization['PISOS - BANHO 2 - BOX - NOME DA OPÇÃO'];
    tempObj['RODAPÉ BOX - BANHO 2'] = personalization['PISOS - BANHO 2 - BOX - RODAPÉ'];
    tempObj['PISOS - SUÍTE 1'] = personalization['PISOS - SUÍTE 1 - NOME DA OPÇÃO'];
    tempObj['RODAPE - SUÍTE 1'] = personalization['PISOS - SUÍTE 1 - RODAPE'];
    tempObj['PISOS - DORMITÓRIO 1'] = personalization['PISOS - DORMITÓRIO 1 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO'];
    tempObj['RODAPE - DORMITÓRIO 1'] = personalization['PISOS - DORMITÓRIO 1 - RODAPE'];
    tempObj['PISOS - DORMITÓRIO 2'] = personalization['PISOS - DORMITÓRIO 2 - OPÇÃO DE REVESTIMENTO - NOME DA OPÇÃO'];
    tempObj['RODAPE - DORMITÓRIO 2'] = personalization['PISOS - DORMITÓRIO 2 - RODAPE'];

    return tempObj;
  }

  setParedes(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['PAREDE - COZINHA'] = personalization['PAREDE - COZINHA - NOME DA OPÇÃO'];
    tempObj['PAREDE - ÁREA DE SERVIÇO'] = personalization['PAREDE - ÁREA DE SERVIÇO - NOME DA OPÇÃO'];
    tempObj['PAREDE - TERRAÇO'] = personalization['PAREDE - TERRAÇO - NOME DA OPÇÃO'];
    tempObj['PAREDE BOX - BANHO 1'] = personalization['PAREDE - BANHO 1 - BOX - NOME DA OPÇÃO'];
    tempObj['PAREDE BANHEIRO - BANHO 1  '] = personalization['PAREDE - BANHEIRO - BANHO 1 - NOME DA OPÇÃO'];
    tempObj['PAREDE BOX - BANHO 2'] = personalization['PAREDE - BANHO 2 - BOX - NOME DA OPÇÃO'];
    tempObj['PAREDE BANHEIRO - BANHO 2  '] = personalization['PAREDE - BANHEIRO - BANHO 2 - NOME DA OPÇÃO'];

    return tempObj;
  }

  setBancadas(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['BANCADA TIPO - COZINHA'] = personalization['COZINHA - BANCADA TIPO - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA - COZINHA'] = personalization['COZINHA - REVESTIMENTO BANCADA - NOME DA OPÇÃO'];
    tempObj['ÁREA DE SERVIÇO E TERRAÇO - TIPO'] = personalization['SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO - NOME DA OPÇÃO'] ? personalization['SIM KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO - NOME DA OPÇÃO'] : personalization['NÃO KIT CHURRASQUEIRA - ÁREA DE SERVIÇO E TERRAÇO - OPÇÃO - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA ÁREA DE SERVIÇO'] = personalization['SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO'] ? personalization['SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO'] : personalization['NÃO KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÁREA DE SERVIÇO - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA KIT CHURRASQUEIRA'] = personalization['SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA KIT CHURRASQUEIRA - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA ÚNICA'] = personalization['SIM KIT CHURRASQUEIRA - REVESTIMENTO BANCADA ÚNICA - NOME DA OPÇÃO'];
    tempObj['BANCADA TIPO - LAVABO'] = personalization['LAVABO - BANCADA TIPO - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA - LAVABO'] = personalization['LAVABO - REVESTIMENTO BANCADA - NOME DA OPÇÃO'];
    tempObj['BANCADA TIPO - BANHO 1'] = personalization['BANHO 1 - BANCADA TIPO - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA - BANHO 1'] = personalization['BANHO 1 - REVESTIMENTO BANCADA - NOME DA OPÇÃO'];
    tempObj['BANCADA TIPO - BANHO 2'] = personalization['BANHO 2 - BANCADA TIPO - NOME DA OPÇÃO'];
    tempObj['REVESTIMENTO BANCADA - BANHO 2'] = personalization['BANHO 2 - REVESTIMENTO BANCADA - NOME DA OPÇÃO'];

    return tempObj;
  }

  setMetais(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['TORNEIRA - COZINHA'] = personalization['COZINHA - TORNEIRA - NOME DA OPÇÃO'];
    tempObj['TORNEIRA ÁREA DE SERVIÇO'] = personalization['SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO'] ? personalization['SIM KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - NOME DA OPÇÃO'] : personalization['NÃO KIT CHURRASQUEIRA - TORNEIRA ÁREA DE SERVIÇO - OPÇÃO - NOME DA OPÇÃO'];
    tempObj['TORNEIRA KIT CHURRASQUEIRA'] = personalization['SIM KIT CHURRASQUEIRA - TORNEIRA KIT CHURRASQUEIRA - NOME DA OPÇÃO'];
    tempObj['TORNEIRA - LAVABO'] = personalization['LAVABO - TORNEIRA - NOME DA OPÇÃO'];
    tempObj['TORNEIRA - BANHO 1'] = personalization['BANHO 1 - TORNEIRA - NOME DA OPÇÃO'];
    tempObj['TORNEIRA - BANHO 2 '] = personalization['BANHO 2 - TORNEIRA - NOME DA OPÇÃO'];
    tempObj['BANHO 1 - DUCHA '] = personalization['BANHO 1 - DUCHA - NOME DA OPÇÃO'];
    tempObj['BANHO 2 - DUCHA '] = personalization['BANHO 2 - DUCHA - NOME DA OPÇÃO'];

    return tempObj;
  }

  setCubas(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['COZINHA - CUBA'] = personalization['COZINHA - CUBA - NOME DA OPÇÃO'];
    tempObj['CUBA ÁREA DE SERVIÇO'] = personalization['NÃO KIT CHURRASQUEIRA - CUBA ÁREA DE SERVIÇO - NOME DA OPÇÃO'];
    tempObj['CUBA KIT CHURRASQUEIRA'] = personalization['SIM KIT CHURRASQUEIRA - CUBA KIT CHURRASQUEIRA - NOME DA OPÇÃO'];
    tempObj['TANQUE ÁREA DE SERVIÇO'] = personalization['SIM KIT CHURRASQUEIRA - TANQUE ÁREA DE SERVIÇO - NOME DA OPÇÃO'];

    return tempObj;
  }

  setBaguete(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['BAGUETE - COZINHA / ÁREA DE SERVIÇO'] = personalization['BITBOX - COZINHA / ÁREA DE SERVIÇO - NOME DA OPÇÃO'];
    tempObj['BAGUETE - ESTAR / TERRAÇO'] = personalization['BAGUETE - ESTAR / TERRAÇO - NOME DA OPÇÃO'];
    tempObj['BAGUETE - LAVABO'] = personalization['BAGUETE - LAVABO - NOME DA OPÇÃO'];
    tempObj['BAGUETE - BANHO 1'] = personalization['BAGUETE - BANHO 1 - NOME DA OPÇÃO'];
    tempObj['BIT BOX - BANHO 1'] = personalization['BIT BOX - BANHO 1 - NOME DA OPÇÃO'];
    tempObj['BAGUETE - BANHO 2'] = personalization['BAGUETE - BANHO 2 - NOME DA OPÇÃO'];
    tempObj['BIT BOX - BANHO 2'] = personalization['BIT BOX - BANHO 2 - NOME DA OPÇÃO'];
    tempObj['BAGUETE - DORM 1'] = personalization['BAGUETE - DORM 1 - NOME DA OPÇÃO'];
    tempObj['BAGUETE - DORM 2'] = personalization['BAGUETE - DORM 2 - NOME DA OPÇÃO'];
    tempObj['BAGUETE - SUÍTE 1'] = personalization['BAGUETE - SUÍTE 1 - NOME DA OPÇÃO'];

    return tempObj;
  }

  setLinha(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['LINHA FRIGORÍGENA - OPÇÃO - NOME DA OPÇÃO'] = personalization['LINHA FRIGORÍGENA - OPÇÃO - NOME DA OPÇÃO'];

    return tempObj;
  }

  setVidro(personalization: any) {
    let tempObj: any = {
      "UNIDADE": personalization['APARTAMENTO'],
      "ÁREA PRIVATIVA": personalization['ÁREA PRIV'],
      "TIPO": personalization['TIPO']
    };

    tempObj['BOX BANHO 1 - PERFIL DE ALUMÍNIO'] = personalization['BANHO 1 - PERFIL DE ALUMÍNIO - NOME DA OPÇÃO'];
    tempObj['BOX BANHO 2 - PERFIL DE ALUMÍNIO'] = personalization['BANHO 2 - PERFIL DE ALUMÍNIO - NOME DA OPÇÃO'];

    return tempObj;
  }

  exportToCsv(data: any, title: any): Promise<any> {
    return new Promise(async (resolve, reject) => {

      const csv = Papa.unparse(data);
      const filename = title+'.csv';
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          resolve(true);
        }, 500);

      }
    })
  }

  parseDefault(arr: any) {
    let temp = '';
    for (let key in arr) {
      let value: any;
      if(typeof arr[key] === "boolean") {
        value = arr[key];
      }
      else if(typeof arr[key] === "number") {
        value = arr[key];
      }
      else if(typeof arr[key] === "string") {
        value = `'${arr[key]}'`
      }
      else {
        value = `''`;
      }
      temp += `'${key}': ${value},\n`
    }

    console.log("temp", temp);
  }

  setClients(importJSON: any) {
    console.log("importJSON", importJSON);
    let clients = [];
    let cleintsSTR = '';
    for(let client of importJSON) {
      clients.push({
        cpfCNPJ: client['CPF / CNPJ'],
        apartamento: client['Unidade'],
        client: client['Cliente'],
        areaPriv: client['Área Priv.'],
        tipo: client['Tipo'],
      })

      cleintsSTR += `{\n\tcpfCNPJ: '${client['CPF / CNPJ']}',\n\tapartamento: ${client['Unidade']},\n\tclient: '${client['Cliente']}',\n\tareaPriv: ${client['Área Priv.']},\n\ttipo: '${client['Tipo']}',\n},\n`;
    }

    // console.log("clients", (JSON.stringify(clients)));

    console.log(cleintsSTR)
  }
}
