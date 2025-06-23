export interface Bank {
  id: string;
  name: string;
  logo: string;
  services: {
    accounts: {
      types: string[];
      requirements: string[];
      description: string;
    };
    credits: {
      types: string[];
      requirements: string[];
      rates: {
        savings: number;
        mortgage: number;
        personal: number;
      };
    };
    insurance: {
      types: string[];
      requirements: string[];
    };
  };
}

export const banks: Bank[] = [
  {
    id: "1",
    name: "Banco Pichincha",
    logo: "https://www.pichincha.com/portal/Portals/0/logo.png",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Xperta"],
        requirements: [
          "Cédula de identidad o pasaporte",
          "Planilla de servicio básico",
          "Monto mínimo de apertura $200",
        ],
        description: "Cuentas diseñadas para satisfacer sus necesidades financieras",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Automotriz"],
        requirements: [
          "Edad entre 23 y 65 años",
          "Estabilidad laboral mínima de 1 año",
          "No tener referencias negativas en buró de crédito",
        ],
        rates: {
          savings: 3.5,
          mortgage: 7.9,
          personal: 15.5,
        },
      },
      insurance: {
        types: ["Vida", "Hogar", "Auto"],
        requirements: [
          "Cédula de identidad",
          "Formulario de solicitud",
          "Declaración de salud",
        ],
      },
    },
  },
  {
    id: "2",
    name: "Banco Guayaquil",
    logo: "https://www.bancoguayaquil.com/images/logo.svg",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Digital"],
        requirements: [
          "Cédula de identidad o pasaporte",
          "Comprobante de domicilio",
          "Monto mínimo de apertura $100",
        ],
        description: "Soluciones financieras adaptadas a tu estilo de vida",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Microcrédito"],
        requirements: [
          "Mayor de 21 años",
          "Ingresos mínimos de $500",
          "Buen historial crediticio",
        ],
        rates: {
          savings: 3.75,
          mortgage: 8.5,
          personal: 16.0,
        },
      },
      insurance: {
        types: ["Vida", "Accidentes", "Viajes"],
        requirements: [
          "Documento de identidad",
          "Solicitud completa",
          "Evaluación médica (según el caso)",
        ],
      },
    },
  },
  {
    id: "3",
    name: "Banco Produbanco",
    logo: "https://www.produbanco.com.ec/img/logo.png",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Óptima"],
        requirements: [
          "Cédula de identidad",
          "Referencia bancaria",
          "Monto mínimo de apertura $150",
        ],
        description: "Servicios bancarios modernos y eficientes",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Empresarial"],
        requirements: [
          "Edad mínima 24 años",
          "Estabilidad laboral 2 años",
          "Capacidad de pago comprobada",
        ],
        rates: {
          savings: 3.25,
          mortgage: 8.75,
          personal: 15.75,
        },
      },
      insurance: {
        types: ["Vida", "Hogar", "Negocio"],
        requirements: [
          "Identificación válida",
          "Formulario de aplicación",
          "Inspección (según el caso)",
        ],
      },
    },
  },
  {
    id: "4",
    name: "Banco del Pacífico",
    logo: "https://www.bancodelpacifico.com/images/logo.png",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Premium"],
        requirements: [
          "Cédula de identidad o pasaporte",
          "Comprobante de ingresos",
          "Monto mínimo de apertura $250",
        ],
        description: "Productos financieros innovadores para el crecimiento personal",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Comercial"],
        requirements: [
          "Edad entre 22 y 70 años",
          "Ingresos demostrables mínimos $400",
          "Historial crediticio favorable",
        ],
        rates: {
          savings: 3.8,
          mortgage: 8.2,
          personal: 15.8,
        },
      },
      insurance: {
        types: ["Vida", "Salud", "Vehicular"],
        requirements: [
          "Documento de identidad válido",
          "Formulario de solicitud completo",
          "Examen médico (según cobertura)",
        ],
      },
    },
  },
  {
    id: "5",
    name: "Banco Bolivariano",
    logo: "https://www.bolivariano.com/images/logo.svg",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Joven"],
        requirements: [
          "Cédula de identidad ecuatoriana",
          "Planilla de servicios básicos",
          "Monto mínimo de apertura $180",
        ],
        description: "Servicios bancarios confiables con tradición bolivariana",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Pyme"],
        requirements: [
          "Mayor de 21 años",
          "Estabilidad laboral 18 meses",
          "Referencias comerciales",
        ],
        rates: {
          savings: 3.6,
          mortgage: 8.0,
          personal: 15.2,
        },
      },
      insurance: {
        types: ["Vida", "Hogar", "Empresarial"],
        requirements: [
          "Identificación personal",
          "Solicitud firmada",
          "Evaluación de riesgos",
        ],
      },
    },
  },
  {
    id: "6",
    name: "Banco Internacional",
    logo: "https://www.bancointernacional.com.ec/logo.png",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Internacional"],
        requirements: [
          "Documento de identidad",
          "Certificado de ingresos",
          "Monto mínimo de apertura $300",
        ],
        description: "Banca internacional con servicios globales y locales",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Corporativo"],
        requirements: [
          "Edad entre 25 y 65 años",
          "Ingresos mínimos $600",
          "Garantías suficientes",
        ],
        rates: {
          savings: 4.0,
          mortgage: 8.8,
          personal: 16.5,
        },
      },
      insurance: {
        types: ["Vida", "Accidentes", "Patrimonial"],
        requirements: [
          "Cédula de ciudadanía",
          "Formulario de aplicación",
          "Declaración de bienes",
        ],
      },
    },
  },
  {
    id: "7",
    name: "Banco Amazonas",
    logo: "https://www.bancoamazonas.com/assets/logo.svg",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Ecológica"],
        requirements: [
          "Cédula de identidad",
          "Comprobante de domicilio",
          "Monto mínimo de apertura $120",
        ],
        description: "Banca sostenible comprometida con el medio ambiente",
      },
      credits: {
        types: ["Hipotecario", "Personal", "Agropecuario"],
        requirements: [
          "Mayor de 20 años",
          "Capacidad de pago demostrada",
          "Sin reportes negativos",
        ],
        rates: {
          savings: 3.4,
          mortgage: 7.8,
          personal: 14.8,
        },
      },
      insurance: {
        types: ["Vida", "Agrícola", "Ambiental"],
        requirements: [
          "Identificación válida",
          "Solicitud de seguro",
          "Inspección técnica",
        ],
      },
    },
  },
  {
    id: "8",
    name: "Banco Solidario",
    logo: "https://www.bancosolidario.com/images/logo.png",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Solidaria"],
        requirements: [
          "Documento de identidad",
          "Referencia personal",
          "Monto mínimo de apertura $80",
        ],
        description: "Microfinanzas y servicios bancarios para el desarrollo social",
      },
      credits: {
        types: ["Microcrédito", "Personal", "Grupal"],
        requirements: [
          "Edad entre 18 y 70 años",
          "Actividad económica demostrable",
          "Aval solidario (según producto)",
        ],
        rates: {
          savings: 2.8,
          mortgage: 9.2,
          personal: 18.5,
        },
      },
      insurance: {
        types: ["Vida", "Microempresa", "Salud"],
        requirements: [
          "Cédula de identidad",
          "Formulario básico",
          "Evaluación socioeconómica",
        ],
      },
    },
  },
  {
    id: "9",
    name: "Banco Nacional de Fomento",
    logo: "https://www.bnf.fin.ec/assets/logo.svg",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Productiva"],
        requirements: [
          "Cédula ecuatoriana",
          "Certificado de actividad productiva",
          "Monto mínimo de apertura $100",
        ],
        description: "Institución pública de fomento al desarrollo productivo",
      },
      credits: {
        types: ["Productivo", "Comercial", "Agropecuario"],
        requirements: [
          "Mayoría de edad",
          "Proyecto productivo viable",
          "Garantías reales",
        ],
        rates: {
          savings: 2.5,
          mortgage: 6.8,
          personal: 12.5,
        },
      },
      insurance: {
        types: ["Vida", "Cosecha", "Productivo"],
        requirements: [
          "Identificación personal",
          "Plan de inversión",
          "Evaluación técnica",
        ],
      },
    },
  },
  {
    id: "10",
    name: "Banco Central del Ecuador",
    logo: "https://www.bce.fin.ec/images/logo.png",
    services: {
      accounts: {
        types: ["Cuenta Institucional", "Cuenta Especial", "Cuenta Gobierno"],
        requirements: [
          "Autorización institucional",
          "Documentos legales",
          "Resolución administrativa",
        ],
        description: "Servicios bancarios especializados para el sector público",
      },
      credits: {
        types: ["Institucional", "Gobierno", "Especial"],
        requirements: [
          "Entidad pública reconocida",
          "Presupuesto aprobado",
          "Autorización legal",
        ],
        rates: {
          savings: 1.5,
          mortgage: 5.5,
          personal: 8.0,
        },
      },
      insurance: {
        types: ["Institucional", "Estatal", "Especial"],
        requirements: [
          "Documento institucional",
          "Autorización legal",
          "Evaluación gubernamental",
        ],
      },
    },
  },
  {
    id: "11",
    name: "Banco ProCredit",
    logo: "https://www.procredit-holding.com/uploads/logo.svg",
    services: {
      accounts: {
        types: ["Cuenta de Ahorros", "Cuenta Corriente", "Cuenta Business"],
        requirements: [
          "Cédula de identidad",
          "Comprobante de ingresos",
          "Monto mínimo de apertura $200",
        ],
        description: "Banca responsable enfocada en pequeñas y medianas empresas",
      },
      credits: {
        types: ["Empresarial", "Personal", "Inmobiliario"],
        requirements: [
          "Edad entre 21 y 65 años",
          "Plan de negocio (empresarial)",
          "Historial crediticio limpio",
        ],
        rates: {
          savings: 3.9,
          mortgage: 8.4,
          personal: 16.2,
        },
      },
      insurance: {
        types: ["Vida", "Empresarial", "Responsabilidad"],
        requirements: [
          "Documento de identidad",
          "Solicitud de seguro",
          "Evaluación de riesgo empresarial",
        ],
      },
    },
  },
];
