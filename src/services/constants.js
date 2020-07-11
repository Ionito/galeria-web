export const condicionIva = [{
    name: "IVA responsable inscripto",
    id: 0
}, {
    name: "IVA sujeto exento",
    id: 1
}, {
    name: "Consumidor final",
    id: 2
}, {
    name: "Responsable monotributo",
    id: 3
}, {
    name: "Sujeto no categorizado",
    id: 4
}, {
    name: "Proveedor del Exterior",
    id: 5
}, {
    name: "Cliente del Exterior",
    id: 6
}, {
    name: "IVA liberado",
    id: 7
}, {
    name: "IVA reponsable inscripto",
    id: 8
}, {
    name: "Monotributista social",
    id: 9
}, {
    name: "Iva no alcanzado",
    id: 10
}]

export const estado_pago = [{
        id: 0,
        type: "pago pendiente"
    },
    {
        id: 1,
        type: "pago parcial"
    },
    {
        id: 2,
        type: "saldado"
    }, {
        id: 3,
        type: "anulada"
    }
]

export const tipo_pago = [{
        id: 0,
        type: "efectivo"
    },
    {
        id: 1,
        type: "cheque"
    },
    {
        id: 2,
        type: "transferencia"
    }
]