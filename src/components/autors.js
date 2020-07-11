import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Edit,
  SimpleForm,
  DateInput,
  TextInput,
  Create
} from "react-admin";

export const Lists = props => (
  <List {...props} bulkActionButtons={false} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Nombre" />
      <EmailField source="email" label="Email" />
      <DateField source="birdth" label="Fecha de nacimiento" />
    </Datagrid>
  </List>
);

const AutorName = ({ record }) => {
  return <span> {record ? `${record.name}` : ""}</span>;
};

export const Edits = props => (
  <Edit {...props} title={<AutorName />}>
    <SimpleForm>
      <TextInput source="name" label="Nombre" />
      <TextInput source="email" type="email" label="Email" />
      <DateInput source="birdth" label="Fecha de nacimiento" />
    </SimpleForm>
  </Edit>
);

export const Creates = props => (
  <Create {...props} successMessage="ra.message.autor_creado">
    <SimpleForm redirect="list">
      <TextInput source="name" label="Nombre" />
      <TextInput source="email" type="email" label="Email" />
      <DateInput source="birdth" label="Fecha de nacimiento" />
    </SimpleForm>
  </Create>
);
