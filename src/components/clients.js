import React from "react";
import {
  Show,
  SimpleShowLayout,
  NumberField,
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  SimpleForm,
  NumberInput,
  TextInput,
  SelectInput,
  Create,
  TopToolbar,
  EditButton,
  DeleteButton
} from "react-admin";
import { condicionIva } from "../services/constants";

export const Lists = props => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="razons" label="razon social" />
      <EmailField source="email" />
      <TextField source="address" />
      <TextField source="barrio" />
    </Datagrid>
  </List>
);

const ClientTitle = ({ record }) => {
  return <span> {record ? `${record.name}` : ""}</span>;
};

const ClientShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} resource={resource} />

    {/*   <Button color="primary" onClick={customAction}>
      Custom Action
    </Button> */}
  </TopToolbar>
);

const CondicionIva = ({ record }) => {
  return (
    <span className="MuiTypography-root MuiTypography-body2">
      {condicionIva[parseInt(record.categoria)].name}
    </span>
  );
};
CondicionIva.defaultProps = { addLabel: true };

export const Shows = props => (
  <Show {...props} title={<ClientTitle />} actions={<ClientShowActions />}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="razons" />
      <CondicionIva source="categoria" />
      <TextField source="cuit" />
      <EmailField source="email" />
      <TextField source="responsable" />
      <TextField source="telefono" />
      <TextField source="address" />
      <TextField source="barrio" />
      <NumberField source="discount" />
      <NumberField source="sucursal" />
    </SimpleShowLayout>
  </Show>
);

export const Edits = props => (
  <Edit {...props} title={<ClientTitle />}>
    <SimpleForm>
      <TextInput label="Nombre" source="name" />
      <TextInput label="Razon Social" source="razons" />
      <SelectInput
        source="categoria"
        label="Condicion iva"
        choices={condicionIva}
      />
      <NumberInput source="cuit" label="Cuit" />
      <NumberInput label="Descuento %" source="discount" />
      <TextInput label="Email" source="email" />
      <NumberInput source="telefono" />
      <TextInput label="Direccion" source="address" />
      <TextInput label="Barrio" source="barrio" />
      <TextInput label="Responsable" source="responsable" />
      <NumberInput label="N sucursal" source="sucursal" />
    </SimpleForm>
  </Edit>
);

const NewClientTitle = ({ record }) => {
  return <span> Crear nuevo cliente</span>;
};

export const Creates = props => (
  <Create {...props} title={<NewClientTitle />}>
    <SimpleForm redirect="list">
      <TextInput label="Nombre" source="name" />
      <TextInput label="Razon Social" source="razons" />
      <SelectInput
        source="categoria"
        label="Condicion iva"
        choices={condicionIva}
      />
      <NumberInput source="cuit" label="Cuit" />
      <NumberInput label="Descuento %" source="discount" />
      <TextInput label="Email" source="email" />
      <NumberInput source="telefono" />
      <TextInput label="Direccion" source="address" />
      <TextInput label="Barrio" source="barrio" />

      <TextInput label="Responsable" source="responsable" />
      <NumberInput label="N sucursal" source="sucursal" />
    </SimpleForm>
  </Create>
);
