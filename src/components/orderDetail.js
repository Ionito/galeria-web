import React from "react";
import { Datagrid, TextField, NumberField, ArrayField } from "react-admin";

const orderDetail = ({ source, record = {} }) => {
  debugger;
  record["libros"] = record["libros"].map((libro, indice) => {
    const newBook = libro;
    newBook.cost = record["pvps"][indice];
    newBook.cantidades = record["cantidades"][indice];
    return newBook;
  });
  return (
    <ArrayField source="libros" record={record}>
      <Datagrid>
        <NumberField source="cantidades" />
        <TextField source="title" />
        <NumberField
          source="cost"
          label="Precio"
          options={{
            style: "currency",
            currency: "ARS",
          }}
        />
      </Datagrid>
    </ArrayField>
  );
};

orderDetail.defaultProps = { label: "Detalle de factura", addLabel: true };

export default orderDetail;
