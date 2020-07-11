import React, { useState, useEffect } from "react";
import * as constant from "../services/constants";
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

const TipoDePago = ({ source, record = {} }) => {
  return (
    <span>
      {record[source] !== undefined
        ? constant.tipo_pago[record[source]].type
        : ""}
    </span>
  );
};
TipoDePago.defaultProps = { label: "Froma de pago", addLabel: true };

const Estado = ({ source, record = {}, ...rest }) => (
  <span>
    {record[source] !== undefined
      ? constant.estado_pago[record[source]].type
      : ""}
  </span>
);
Estado.defaultProps = { label: "Estado", addLabel: true };

export const Lists = (props) => (
  <List {...props} filters={<GnrlFilter />} perPage={25}>
    <Datagrid rowClick="show">
      <TextField source="numero" />
      <DateField source="fecha" />
      <TipoDePago source="tipopago" />
      <TextField label="Cliente" source="cliente.name" />
      <NumberField source="descuento" />
      <NumberField source="total" />
      <Estado source="estado" />
    </Datagrid>
  </List>
);

export const Shows = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <NumberField source="numero" label="Número de factura" />
      <DateField source="fecha" />
      <TipoDePago source="tipopago" />
      <TextField label="Cliente" source="cliente.name" />
      <NumberField source="punto_vta" label="Punto de venta" />
      <OrderDetail />
      <NumberField source="descuento" />
      <NumberField source="total" />
      <Estado source="estado" label="Estado" />
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
        <BooleanInput
          label="Facturar afip"
          source="afip"
          initialValue={false}
        />

        <SelectInput
          label="Estado"
          source="estado"
          choices={constant.estado_pago}
          optionText="type"
          optionValue="id"
          initialValue="0"
        />

        <SelectInput
          source="tipopago"
          label="Forma de pago"
          choices={constant.tipo_pago}
          optionText="type"
          optionValue="id"
          initialValue="0"
        />

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
