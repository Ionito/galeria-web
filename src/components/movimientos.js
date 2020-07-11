import React from "react";
import { NumberField, List, Datagrid, TextField, DateField } from "react-admin";

const MovimientosLog = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <DateField source="date" label="fecha" />
        <TextField source="cod_fact.numero" label="factura" />
        <TextField source="cod_remi.numero" label="remito" />
        <TextField label="Cliente" source="client.name" />
        <TextField label="Libro" source="libro.title" />
        <TextField source="resp.name" label="responsable" />

        <NumberField label="Costo Uni" source="costouni" />
        <NumberField label="Total" source="total" />

        <NumberField source="ebaja" label="Baja" />
        <NumberField source="ealta" label="Alta" />
      </Datagrid>
    </List>
  );
};

export default MovimientosLog;
