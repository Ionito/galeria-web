import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  SimpleForm,
  DateInput,
  TextInput,
  NumberInput,
  Create,
  Filter,
  Show,
  SimpleShowLayout,
  NumberField,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  FormDataConsumer,
  BooleanInput,
  ReferenceField,
  useDataProvider,
} from "react-admin";
import SubTotalDetail from "./subTotalDetail";
import CustomCostInput from "./customCostInput";
import OrderDetail from "./orderDetail";

const GnrlFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Cliente" source="cliente" />
    <TextInput label="Numero Factura" source="factura" />
  </Filter>
);

export const Lists = (props) => (
  <List {...props} filters={<GnrlFilter />} perPage={25}>
    <Datagrid rowClick="show">
      <TextField source="numero" />
      <DateField source="fecha" />
      <TextField label="Cliente" source="cliente.name" />
      <NumberField source="descuento" />
    </Datagrid>
  </List>
);

export const Shows = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <NumberField source="numero" label="Número de remito" />
      <DateField source="fecha" />
      <TextField label="Cliente" source="cliente.name" />
      <OrderDetail />
      <NumberField source="descuento" />
      <NumberField source="total" />
    </SimpleShowLayout>
  </Show>
);

const AutocompleteClients = (props) => {
  useEffect(() => {
    props.setAll(props.choices);
  }, [props]); //cada vez que cambia props.choices
  return <AutocompleteInput optionText="name" {...props} />;
};

export const Creates = (props) => {
  const [allClients, setAllClients] = useState([]);
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <ReferenceInput source="cliente" reference="clientes" label="Cliente">
          <AutocompleteClients setAll={setAllClients} />
        </ReferenceInput>
        <DateInput source="fecha" initialValue={Date.now()} />

        <ArrayInput source="detalle" label="Detalle">
          <SimpleFormIterator className="ioni">
            <NumberInput source="cantidad" label="cantidad" initialValue={1} />
            <ReferenceInput source="_id" reference="libros" label="libro">
              <AutocompleteInput
                optionText="title"
                allowEmpty={false}
                optionValue="_id"
              />
            </ReferenceInput>
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, ...rest }) => {
                return scopedFormData && scopedFormData._id ? (
                  <ReferenceInput
                    label="Cost"
                    source={getSource("costo")}
                    reference="libros"
                    filter={{ _id: scopedFormData._id }}
                  >
                    <CustomCostInput />
                  </ReferenceInput>
                ) : null;
              }}
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
        <FormDataConsumer>
          {({ formData, scopedFormData, getSource, ...rest }) => {
            return formData && formData.cliente && formData.detalle ? (
              <SubTotalDetail
                allClients={allClients}
                formData={formData}
                {...rest}
              />
            ) : null;
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
