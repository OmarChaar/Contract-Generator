import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { ContractService } from './services/contract.service';
import { Document, ImageRun, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';
import { ClientsService } from './services/clients.service';
import { DefaultsService } from './services/defaults.service';
import * as JSZip from 'jszip';
import { updatePrefix } from 'typescript';

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

  async processJSON(importJSON: any) {
    // this.setClients(importJSON);

    this.submitted = [];
    this.tempSubmitted = [];
    let allClients: any = await this.parseAll(importJSON);

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

        this.addImageHTML(div, areaPriv, tipo);

        div.innerHTML += `<b>Definições de Acabamentos:</b> <br>`

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

        this.addSignatureHTML(div);

      // }
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
    console.log("client", client);

    let title = client.apartamento + '_' + client.client;
    let fileName = title + ".docx";
    let element = document.getElementById(client.cpfCNPJ);
    if (element) {
      let splitByBR = element.innerHTML.split('<br>');

      let children: any[] = [];
      for (const el of splitByBR) {
        if (el.trim().length > 0) {
          if(el.includes('<img') && !el.includes('signature')) {
            await this.addImage(children, client);
          }
          else if(el.includes('Definições de Acabamentos')) {
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
            const trimmedEl = el.split('\n')[1].trim();

            const bold = trimmedEl.match(/<b>(.*?)<\/b>/);
            const text = trimmedEl.match(/<\/b>(.*)/);
            if (bold && text) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${bold[1]}\n`,
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

      await this.addSignature(children);

      const doc = new (Document as any)({
        sections: [
          {
            properties: {},
            children: children,
          },
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
          if(el.includes('<img') && !el.includes('signature')) {
            await this.addImage(children, client);
          }
          else if(el.includes('Definições de Acabamentos')) {
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
            const trimmedEl = el.split('\n')[1].trim();
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

      await this.addSignature(children);

      const doc = new (Document as any)({
        sections: [
          {
            properties: {},
            children: children,
          },
        ],
        pageSize: {
          width: 595,
          height: 842,
        },
        margin: {
          top: 36,
          bottom: 36,
          left: 36,
          right: 36,
        },
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, fileName);
      });
    }
  }

  addImageHTML(div: any, area: any, tipo: any) {

    if(area == 100 && tipo == 'TIPO 1') {
      div.innerHTML += `<img src='../assets/imgs/100_tipo1.jpg' width='50%'/> <br>`;
    }
    else if(area == 100 && tipo == 'TIPO 2') {
      div.innerHTML += `<img src='../assets/imgs/100_tipo2.jpg' width='50%'/> <br>`;
    }
    else if(area == 124.21 && tipo == 'TIPO 1') {
      div.innerHTML += `<img src='../assets/imgs/124_tipo1.jpg' width='50%'/> <br>`;
    }
    else if(area == 124.21 && tipo == 'TIPO 2') {
      div.innerHTML += `<img src='../assets/imgs/124_tipo2.jpg' width='50%'/> <br>`;
    }
    else if(area == 85.83) {
      div.innerHTML += `<img src='../assets/imgs/85.jpg' width='50%'/> <br>`;
    }
    else if(area == 70) {
      div.innerHTML += `<img src='../assets/imgs/70.jpg' width='50%'/> <br>`;
    }
  }

  async addImage(children: any, client: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let img;

      if(client.area == 100 && client.tipo == 'Tipo 1') {
        img = await this.loadImage('../assets/imgs/100_tipo1.jpg');
      }
      else if(client.area == 100 && client.tipo == 'Tipo 2') {
        img = await this.loadImage('../assets/imgs/100_tipo2.jpg');
      }
      else if(client.area == 124.21 && client.tipo == 'Tipo 1') {
        img = await this.loadImage('../assets/imgs/124_tipo1.jpg');
      }
      else if(client.area == 124.21 && client.tipo == 'Tipo 2') {
        img = await this.loadImage('../assets/imgs/124_tipo2.jpg');
      }
      else if(client.area == 85.83) {
        img = await this.loadImage('../assets/imgs/85.jpg');
      }
      else if(client.area == 70) {
        img = await this.loadImage('../assets/imgs/70.jpg');
      }

      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      let ctx = canvas.getContext('2d');
      if(ctx != null) {
        ctx.drawImage(img as CanvasImageSource, 0, 0, 600, 600);
        const imageData = canvas.toDataURL('image/jpg');
        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: imageData,
                transformation: {
                  height: 600,
                  width: 600
                }
              })
            ],
          })
        );

        resolve(true);
      }
    })
  }

  addSignatureHTML(div: any) {
    div.innerHTML += `<img src='../assets/imgs/signature.jpg' width='100%'/> <br>`;
  }

  async addSignature(children: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const img = await this.loadImage('../assets/imgs/signature.jpg');

      const imgWidth = 600;
      const imgHeight = 100;

      const canvas = document.createElement('canvas');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      let ctx = canvas.getContext('2d');
      if(ctx != null) {
        ctx.drawImage(img as CanvasImageSource, 0, 0, imgWidth, imgHeight);
        const imageData = canvas.toDataURL('image/jpg');
        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: imageData,
                transformation: {
                  height: imgHeight,
                  width: imgWidth,
                }
              })
            ],
          })
        );

        resolve(true);
      }
    });
  }

  loadImage(src: any) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
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
        return String(el.client).toLowerCase().indexOf(event.target.value) > -1 || String(el.cpfCNPJ).toLowerCase().indexOf(event.target.value) > -1;
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
