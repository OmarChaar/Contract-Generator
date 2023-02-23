import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    public contractService: ContractService,
    private clientsService: ClientsService,
    private defaultsService: DefaultsService
  ) {


  }

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

      div.innerHTML += `<br><b>Definições de Acabamentos:</b>`

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

      resolve(parsed);
    })
  }

  checkClientSubmitted(client: any, importJSON: any) {
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
    console.log("client", client);
    let planBlob: any;

    const aptEnding = client.apartamento.toString();
    const lastChar = aptEnding.charAt(aptEnding.length - 1);

    // Not the first floor
    if(client.apartamento > 19) {
      if(lastChar == '1') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
      else if(lastChar == '2') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
      else if(lastChar == '3') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '4') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '5') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '6') {
        // area: 70
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '7') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
      else if(lastChar == '8') {
        // area: 100
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
    }
    else {
      if(lastChar == '1') {
        // area: 128
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
      else if(lastChar == '2') {
        // area: 128
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
      else if(lastChar == '3') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '4') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '5') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '6') {
        // area: 85
        planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
      }
      else if(lastChar == '7') {
        // area: 128
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
      }
      else if(lastChar == '8') {
        // area: 128
        if(client.tipo == 'Tipo 1') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
        }
        else if(client.tipo == 'Tipo 2') {
          planBlob = await this.urlToBlob('../assets/imgs/image.jpg');
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

  generateCVS() {
    console.log("generateCVS parsedClients", this.parsedClients);
    for(let personalization of this.parsedClients) {

      const pisosObj = this.setObjs("PISOS", personalization);
      // console.log("pisosObj", pisosObj);

      const paredeObj = this.setObjs("PAREDE", personalization);
      // console.log("paredeObj", paredeObj);

      const bagueteObj = this.setObjs("BAGUETE", personalization);
      // console.log("bagueteObj", bagueteObj);
    }
  }

  setObjs(type: any, personalization: any) {
    let tempObj: any = {
      "NOME DO CLIENTE": personalization['NOME DO CLIENTE'],
      "CPF / CNPJ": personalization['CPF / CNPJ'],
      "APARTAMENTO": personalization['APARTAMENTO']
    };
    for (let key in personalization) {
      if(type == "PISOS" && key.includes(type) && key.includes("RODAPÉ") && !key.includes("RODAPÉ - PREÇO") ) {
        tempObj[key] = personalization[key];
      }

      if(key.includes(type) && key.includes("NOME DA OPÇÃO")) {
        tempObj[key.replace(" - NOME DA OPÇÃO", '')] = personalization[key];
      }
    }

    return tempObj;
  }

  // parseDefault(arr: any) {
  //   let temp = '';
  //   for (let key in arr) {
  //     let value: any;
  //     if(typeof arr[key] === "boolean") {
  //       value = arr[key];
  //     }
  //     else if(typeof arr[key] === "number") {
  //       value = arr[key];
  //     }
  //     else if(typeof arr[key] === "string") {
  //       value = `'${arr[key]}'`
  //     }
  //     else {
  //       value = `''`;
  //     }
  //     temp += `'${key}': ${value},\n`
  //   }

  //   console.log("temp", temp);
  // }

  // setClients(importJSON: any) {
  //   console.log("importJSON", importJSON);
  //   let clients = [];
  //   let cleintsSTR = '';
  //   for(let client of importJSON) {
  //     clients.push({
  //       cpfCNPJ: client['CPF / CNPJ'],
  //       apartamento: client['Unidade'],
  //       client: client['Cliente'],
  //       areaPriv: client['Área Priv.'],
  //       tipo: client['Tipo'],
  //     })

  //     cleintsSTR += `{\n\tcpfCNPJ: '${client['CPF / CNPJ']}',\n\tapartamento: ${client['Unidade']},\n\tclient: '${client['Cliente']}',\n\tareaPriv: ${client['Área Priv.']},\n\ttipo: '${client['Tipo']}',\n},\n`;
  //   }

  //   // console.log("clients", (JSON.stringify(clients)));

  //   console.log(cleintsSTR)
  // }
}
