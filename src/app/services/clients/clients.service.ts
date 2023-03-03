import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public clients = [
    {
      cpfCNPJ: 'DISPONÍVEL-147',
      apartamento: 147,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-183',
      apartamento: 183,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '426.316.608-62',
      apartamento: 166,
      client: 'JORGE FERNANDO TONDATO MERLIN',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-77',
      apartamento: 77,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '248.867.458-30',
      apartamento: 152,
      client: 'DIONIZIO SOARES DOS REIS JUNIOR',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '054.633.688-48',
      apartamento: 198,
      client: 'PEDRO MALDONADO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-103',
      apartamento: 103,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '100.475.278-46',
      apartamento: 148,
      client: 'JOÃO APARECIDO DE LIMA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-85',
      apartamento: 85,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '359.201.158-82',
      apartamento: 93,
      client: 'PAULA ANGELICA FERREIRA DA LUZ',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '153.329.308-28',
      apartamento: 131,
      client: 'CARLOS MARCEL ANANIAS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '471.746.418-49',
      apartamento: 197,
      client: 'DEMETRIO AMATI FILHO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '087.124.458-60',
      apartamento: 266,
      client: 'JANE TING JUN TIN',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '162.560.848-96',
      apartamento: 122,
      client: 'MANOEL NASCIMENTO DE SOUZA NETO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-56',
      apartamento: 56,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '068.945.548-89',
      apartamento: 251,
      client: 'MARCELO VALTER DO AMARAL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-57',
      apartamento: 57,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '025.104.068-25',
      apartamento: 163,
      client: 'MARCELO GASTALDI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '076.299.508-45',
      apartamento: 277,
      client: 'NIVALDO ROQUE',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-158',
      apartamento: 158,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '255.250.928-24',
      apartamento: 182,
      client: 'ELIANA SOUSA CUNHA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '055.404.438-29',
      apartamento: 153,
      client: 'WILSON ORLANDO MIORIM',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '363.358.888-40',
      apartamento: 155,
      client: 'ARTHUR HIRSCHIFELD DANILA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '222.317.518-01',
      apartamento: 248,
      client: 'ERICO RODRIGUES LIMA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'PERMUTA-263',
      apartamento: 263,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '087.116.038-28',
      apartamento: 288,
      client: 'MARCIA FRANCISCO DO NASCIMENTO NACFUR',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '310.959.738-19',
      apartamento: 184,
      client: 'FERNANDO LABES MOREIRA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '176.970.838-33',
      apartamento: 177,
      client: 'EDUARDO HENRIQUE DE OLIVEIRA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-157',
      apartamento: 157,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '451.623.498-01',
      apartamento: 247,
      client: 'VINICIUS BUZAS KUN',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '175.822.488-64',
      apartamento: 253,
      client: 'ROBSON ROBERTO SITTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-28',
      apartamento: 28,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '338.220.228-02',
      apartamento: 237,
      client: 'MARINA BEATRIZ DOS SANTOS',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-32',
      apartamento: 32,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '29.198.156/0001-00',
      apartamento: 282,
      client: 'A2S PARTICIPAÇÕES E EMPREENDIMENTOS LTDA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '166.312.468-06',
      apartamento: 144,
      client: 'ODMAR DE SOUZA SILVA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '49.796.425/0001-59',
      apartamento: 254,
      client: 'VALMAN INDUSTRIA METALURGICA LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '113.075.598-32',
      apartamento: 82,
      client: 'SANDRA CRISTINA  NEIVA  PICCOLLI',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-17',
      apartamento: 17,
      client: 'INDISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '328.591.358-47',
      apartamento: 132,
      client: 'DIANA COSTA CUNHA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '09.150.820/0001-34',
      apartamento: 232,
      client: 'WL SERVIÇOS DE COBRANÇAS LTDA-ME',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '040.666.068-90',
      apartamento: 12,
      client: 'ROSELI APARECIDA PONTES',
      areaPriv: 124.21,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '087.124.458-60',
      apartamento: 268,
      client: 'JANE TING JUN TIN',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '401.105.668-58',
      apartamento: 151,
      client: 'THIAGO DE AQUINO  VEIGAS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-42',
      apartamento: 42,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '029.576.434-13',
      apartamento: 117,
      client: 'JULIANA FIGUEIREDO ALMEIDA MENDES',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '477.281.058-76',
      apartamento: 141,
      client: 'PAULO HENRIQUE DOS SANTOS',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '087.116.038-28',
      apartamento: 276,
      client: 'MARCIA FRANCISCO DO NASCIMENTO NACFUR',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-114',
      apartamento: 114,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '096.592.438-63',
      apartamento: 11,
      client: 'IDALINA BEZERRA NETA',
      areaPriv: 124.21,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-142',
      apartamento: 142,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '231.136.298-45',
      apartamento: 52,
      client: 'ERNESTO FRANK CISNEROS LOPEZ',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '216.450.478-06',
      apartamento: 95,
      client: 'CAROLINA MUNHOZ',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '087.116.038-28',
      apartamento: 275,
      client: 'MARCIA FRANCISCO DO NASCIMENTO NACFUR',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-31',
      apartamento: 31,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '326.822.488-10',
      apartamento: 211,
      client: 'CAMILA SOARES CABRERA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'PERMUTA-178',
      apartamento: 178,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '383.009.418-35',
      apartamento: 193,
      client: 'GEZIANA LIMA DO NASCIMENTO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-45',
      apartamento: 45,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '187.907.618-71',
      apartamento: 228,
      client: 'RENE GONZALEZ LOURENÇO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '807.421.818-04',
      apartamento: 173,
      client: 'TEODOMIRO ALVES DA ROCHA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '268.351.538-30',
      apartamento: 203,
      client: 'RODRIGO ALVES SILVA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '17.874.743/0001-93',
      apartamento: 235,
      client: 'HBNF PARTICIPAÇÕES LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '19.593.109/0001-08',
      apartamento: 58,
      client: 'RODRIGO BELLA MARTINEZ SOCIEDADE DE ADVOGADOS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '103.327.258-20',
      apartamento: 145,
      client: 'LUSIA APARECIDA PEREIRA ANTONIASSI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '043.104.518-61',
      apartamento: 134,
      client: 'DAURO STENIO FREIRE BESSA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '19.593.109/0001-08',
      apartamento: 68,
      client: 'RODRIGO BELLA MARTINEZ SOCIEDADE DE ADVOGADOS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '60.498.292/0001-66',
      apartamento: 257,
      client: 'SAS BOX REPRESENTAÇÕES COMERCIAS LTDA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '03.073.261/0001-20',
      apartamento: 43,
      client: 'CARIM PARTICIPAÇÕES LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '06.125.011/0001-84',
      apartamento: 206,
      client: 'ABMGAZ COMERCIO DE GAS LTDA ME',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-286',
      apartamento: 286,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '220.614.858-71',
      apartamento: 97,
      client: 'DANIELLA RENAN DOS SANTOS',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '37.260.418/0001-48',
      apartamento: 227,
      client: 'KASPER COMERCIO DE ROUPAS EIRELI',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '352.651.878-55',
      apartamento: 278,
      client: 'MARIA LAURA BEZERRA DE CAMPOS',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '858.896.108-30',
      apartamento: 25,
      client: 'MARIO SERGIO MARQUES',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '151.910.208-98',
      apartamento: 46,
      client: 'MARCO ANTONIO VAZEL CAFFARENA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '262.726.428-14',
      apartamento: 241,
      client: 'GIANCARLO PEREIRA MARTINS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-205',
      apartamento: 205,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '096.647.958-01',
      apartamento: 33,
      client: 'DENILSON NUNES DOS SANTOS',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '188.611.548-67',
      apartamento: 271,
      client: 'ALLYSON FONTES SIMÕES',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '313.750.813-49',
      apartamento: 75,
      client: 'DOMINGOS LEAL DE CARVALHO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '136.251.408-02',
      apartamento: 252,
      client: 'PAULO ROGERIO DONATO TELES',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-63',
      apartamento: 63,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-223',
      apartamento: 223,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '111.038.878-07',
      apartamento: 127,
      client: 'GILBERTO DE OLIVEIRA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'PERMUTA-24',
      apartamento: 24,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-267',
      apartamento: 267,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-36',
      apartamento: 36,
      client: 'DISPONÍVEL',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-216',
      apartamento: 216,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '37.902.725/0001-85',
      apartamento: 171,
      client: 'INFRA ELETRICA E HIDRÁULICA, SERVIÇOS, COMÉRCIO E MANUTENÇÃO INDUSTRIAL LTDA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-111',
      apartamento: 111,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-258',
      apartamento: 258,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-274',
      apartamento: 274,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '319.182.288-76',
      apartamento: 246,
      client: 'TIAGO RICARDO DE CASTRO JANUARIO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '019.797.788-09',
      apartamento: 174,
      client: 'EDUARDO CARVALHO DE VASCONCELLOS',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-48',
      apartamento: 48,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '573.183.018-53',
      apartamento: 281,
      client: 'DORIS LUIZA KAHN',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '33.923.311/0001-81',
      apartamento: 272,
      client: 'MS ASSESSORIA CONTÁBIL EIRELI',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '395.703.428-03',
      apartamento: 146,
      client: 'MILENA BEZERRA FREITAS',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '331.875.188-00',
      apartamento: 212,
      client: 'MICHEL APARECIDO RIBEIRO',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'PERMUTA-245',
      apartamento: 245,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '214.836.888-52',
      apartamento: 215,
      client: 'EDUARDO SOARES PASSOS DA SILVA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '357.616.748-07',
      apartamento: 106,
      client: 'RICARDO PETTA DE ANDRADE',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '104.562.078-56',
      apartamento: 73,
      client: 'EDI CARLOS CESAR',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '410.885.108-09',
      apartamento: 226,
      client: 'VINICIUS TONINI DE ALMEIDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '17.874.743/0001-93',
      apartamento: 231,
      client: 'HBNF PARTICIPAÇÕES LTDA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '352.355.258-33',
      apartamento: 84,
      client: 'FELIPE ACACIO DOS SANTOS',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '448.717.988-28',
      apartamento: 164,
      client: 'MURILO DE LIMA MARQUES DA SILVA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '123.369.656-40',
      apartamento: 105,
      client: 'LUCAS HENRIQUE RIBEIRO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '091.178.128-52',
      apartamento: 55,
      client: 'CLOVIS PARIZON',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-18',
      apartamento: 18,
      client: 'INDISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-71',
      apartamento: 71,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '436.863.908-17',
      apartamento: 13,
      client: 'ISABEL CRISTINA BEZERRA DE CARVALHO GREGORIO',
      areaPriv: 85.83,
      tipo: 'null',
    },
    {
      cpfCNPJ: '086.252.968-90',
      apartamento: 107,
      client: 'ELIZETE MIRANDA SOARES DE LORENZO',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '31.818.984/0001-46',
      apartamento: 112,
      client: 'WR PARTICIPAÇÕES E ASSESSORIA LTDA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-74',
      apartamento: 74,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '375.639.188-41',
      apartamento: 53,
      client: 'HENRIQUE CASTANHO MODESTO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-72',
      apartamento: 72,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-181',
      apartamento: 181,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '60.498.292/0001-66',
      apartamento: 195,
      client: 'SAS BOX REPRESENTAÇÕES COMERCIAS LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '187.907.618-71',
      apartamento: 186,
      client: 'RENE GONZALEZ LOURENÇO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '261.377.318-98',
      apartamento: 14,
      client: 'FERNANDA CRISTINA DE OLIVEIRA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-62',
      apartamento: 62,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-136',
      apartamento: 136,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-16',
      apartamento: 16,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-47',
      apartamento: 47,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '088.265.398-98',
      apartamento: 156,
      client: 'DOUGLAS APARECIDO DELGADO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '13.809.810/0001-35',
      apartamento: 255,
      client: 'WGA ADMINISTRAÇÃO DE BENS PRÓPRIOS E PARTICIPAÇÕES EIRELI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '213.832.698-58',
      apartamento: 81,
      client: 'CARLOS ALBERTO DE OLIVEIRA LEITÃO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '125.740.118-13',
      apartamento: 118,
      client: 'ELAINE APARECIDA FECCHIO',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '333.942.038-63',
      apartamento: 94,
      client: 'JULIANA ANDRADE',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '272.883.268-45',
      apartamento: 92,
      client: 'EMERENTINA ANDREZA APARECIDA DE OLIVEIRA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '03.300.110/0001-67',
      apartamento: 204,
      client: 'MANFRE COMERCIO E REPRESENTAÇÕES LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-22',
      apartamento: 22,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '322.852.758-11',
      apartamento: 124,
      client: 'DAVI CARDOSO BITTENCOURT',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '116.499.708-46',
      apartamento: 113,
      client: 'EDUARDO BRAGA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '318.451.708-06',
      apartamento: 218,
      client: 'CEZAR AUGUSTO PIATELLI DA CUNHA BUENO',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '303.420.298-94',
      apartamento: 26,
      client: 'DANIEL LEAO DE ALMEIDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '275.301.888-01',
      apartamento: 172,
      client: 'JOAO PAULO DE OLIVEIRA NETTO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-285',
      apartamento: 285,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '011.573.728-64',
      apartamento: 35,
      client: 'ELCIO ALVES DA SILVA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '271.568.638-27',
      apartamento: 51,
      client: 'ERIC LUIZ FAVERÃO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '222.531.408-05',
      apartamento: 102,
      client: 'ROBISON BARRETO DOS SANTOS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-194',
      apartamento: 194,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-138',
      apartamento: 138,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-125',
      apartamento: 125,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '086.252.968-90',
      apartamento: 108,
      client: 'ELIZETE MIRANDA SOARES DE LORENZO',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '428.432.048-36',
      apartamento: 83,
      client: 'EDUARDO PEREZ PEREIRA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '22.160.181/0001-56',
      apartamento: 196,
      client: 'PRIME SOCCER CONSULTORIA ESPORTIVA EIRELI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '49.796.425/0001-59',
      apartamento: 273,
      client: 'VALMAN INDUSTRIA METALURGICA LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '20.424.125/0001-56',
      apartamento: 185,
      client: 'MC OZIO COMERCIO E SERVIÇOS DE MANUTENÇÃO E INSTALAÇÃO DE AR CONDICIONADO EIRELI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '106.915.918-22',
      apartamento: 64,
      client: 'FLAVIO DOS SANTOS CARRAMÃO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '305.069.478-58',
      apartamento: 242,
      client: 'MICHELE FERRACIN ARAUJO',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '287.954.998-14',
      apartamento: 161,
      client: 'VANESSA MAINARDI RIBEIRO DE SOUZA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '411.145.218-33',
      apartamento: 175,
      client: 'FELIPPE MARCHIONNO FONTES',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '668.976.538-53',
      apartamento: 188,
      client: 'ODINA TEREZA MAINARDI',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '153.343.578-23',
      apartamento: 202,
      client: 'ROGERIO ALMEIDA DE SOUSA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '31.310.146/0001-67',
      apartamento: 262,
      client: 'SIGMA AUTO PEÇAS E ACESSORIOS LTDA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '49.796.425/0001-59',
      apartamento: 265,
      client: 'VALMAN INDUSTRIA METALURGICA LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '312.016.158-60',
      apartamento: 168,
      client: 'KATIA ALINE MUKAIDA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '342.298.468-27',
      apartamento: 76,
      client: 'NATALIA SARTORI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-261',
      apartamento: 261,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-167',
      apartamento: 167,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-96',
      apartamento: 96,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '886.397.897-20',
      apartamento: 283,
      client: 'RENATO PINTO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '049.751.458-39',
      apartamento: 115,
      client: 'AMAURI ANTONIO RIBEIRO MARTINS',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-137',
      apartamento: 137,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-221',
      apartamento: 221,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '273.883.258-08',
      apartamento: 128,
      client: 'MARCIA PEREIRA DANYLUK',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '29.198.156/0001-00',
      apartamento: 284,
      client: 'A2S PARTICIPAÇÕES E EMPREENDIMENTOS LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '418.718.818-54',
      apartamento: 162,
      client: 'HENRIQUE MOREIRA GUERCHE ',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '837.421.157-15',
      apartamento: 135,
      client: 'RITA DE CASSIA OLIVEIRA DA SILVEIRA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-38',
      apartamento: 38,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '120.682.678-96',
      apartamento: 225,
      client: 'CLAUDIO COELHO FILHO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-201',
      apartamento: 201,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '073.675.008-80',
      apartamento: 78,
      client: 'ILSO RIBEIRO DE SANTANA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'PERMUTA-21',
      apartamento: 21,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-256',
      apartamento: 256,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '343.736.008-64',
      apartamento: 54,
      client: 'VINICIUS DA COSTA SANTOS',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '518.788.958-34',
      apartamento: 192,
      client: 'MAURO BIONDI',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-217',
      apartamento: 217,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '49.296.940/0001-69',
      apartamento: 66,
      client: 'COMERCIO DE EMBALAGENS PAULICEIA EIRELI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '395.860.758-69',
      apartamento: 207,
      client: 'WILSON ROBERTO GOMES FILHO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '111.651.031-68',
      apartamento: 233,
      client: 'CARLOS HENRIQUE DA SILVA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '255.433.538-98',
      apartamento: 126,
      client: 'LUCIMARA DA ROSA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '679.735.314-91',
      apartamento: 244,
      client: 'RITA DE CASSIA DE LIMA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-176',
      apartamento: 176,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '151.205.018-00',
      apartamento: 213,
      client: 'MARCIA KIOMI KAWANO CHO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-101',
      apartamento: 101,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '227.660.458-13',
      apartamento: 65,
      client: 'ROBERTO DA SILVA RIBEIRO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '188.611.548-67',
      apartamento: 238,
      client: 'ALLYSON FONTES SIMÕES',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '076.299.508-45',
      apartamento: 236,
      client: 'NIVALDO ROQUE',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '110.938.188-32',
      apartamento: 208,
      client: 'LUIS ALBERTO FERREIRA LIMA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-121',
      apartamento: 121,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-287',
      apartamento: 287,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '086.047.738-00',
      apartamento: 214,
      client: 'RICARDO VALESI BAPTISTELLA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-234',
      apartamento: 234,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '423.906.448-13',
      apartamento: 123,
      client: 'JOAO VICTOR SOUZA BORNATO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '093.325.098-32',
      apartamento: 191,
      client: 'ANA LUCIA DE SOUZA',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: '083.700.028-97',
      apartamento: 264,
      client: 'CARLOS ANTONIO LAUREANO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-23',
      apartamento: 23,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '320.071.368-21',
      apartamento: 86,
      client: 'JULIANA CASEMIRO CARBONARI',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-143',
      apartamento: 143,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '189.019.158-20',
      apartamento: 116,
      client: 'CLERIZON CAIRES CATULE ',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-67',
      apartamento: 67,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-187',
      apartamento: 187,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '377.125.968-16',
      apartamento: 15,
      client: 'RAFAEL BEZERRA DE CARVALHO',
      areaPriv: 85.83,
      tipo: 'null',
    },
    {
      cpfCNPJ: '07.038.189/0001-50',
      apartamento: 224,
      client: 'STOP AKI PARK SERVIÇOS DE ESTACIONAMENTO LTDA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '136.587.828-70',
      apartamento: 61,
      client: 'MARCOS MASCAGNI',
      areaPriv: 100,
      tipo: 'Tipo 1',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-41',
      apartamento: 41,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '691.244.000-25',
      apartamento: 104,
      client: 'ROSANGELA BOSENBECKER',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '072.124.228-60',
      apartamento: 27,
      client: 'JOSÉ ARIOMAR MODESTO LEONIDAS',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-98',
      apartamento: 98,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-154',
      apartamento: 154,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-87',
      apartamento: 87,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '13.810.004/0001-87',
      apartamento: 243,
      client: 'EAV ADMINISTRAÇÃO DE BENS PROPRIOS E PARTICIPAÇÕES',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: '261.653.168-24',
      apartamento: 133,
      client: 'TAIS DE SOUZA ASSUNÇÃO',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-44',
      apartamento: 44,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'PERMUTA-34',
      apartamento: 34,
      client: 'PERMUTA',
      areaPriv: 70,
      tipo: 'null',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-37',
      apartamento: 37,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'PERMUTA-222',
      apartamento: 222,
      client: 'PERMUTA',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: '285.560.968-24',
      apartamento: 88,
      client: 'ANDERSON DA COSTA FAUSTINO',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
    {
      cpfCNPJ: 'DISPONÍVEL-91',
      apartamento: 91,
      client: 'DISPONÍVEL',
      areaPriv: 100,
      tipo: 'Tipo 2',
    },
  ]

  constructor() { }
}



