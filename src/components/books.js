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
  SelectArrayInput,
  SelectInput,
  Create,
  TopToolbar,
  EditButton,
  DeleteButton,
  ArrayField,
  SingleFieldList,
  ChipField,
  DateField,
  DateInput,
  TabbedShowLayout,
  ImageField,
  Tab,
  FormTab,
  ArrayInput,
  SimpleFormIterator,
  TabbedForm,
  ReferenceArrayInput,
  AutocompleteInput,
  ReferenceInput,
  ImageInput
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  hasBorder: {
    "& img": {
      border: "1px solid #999"
    }
  }
});

const InDatePriceField = ({ source, record = {} }) => {
  let rec;
  if (Object.keys(record[source]).length !== 0) {
    rec = record[source].reduce((a, b) => (a.date > b.date ? a : b));
    return <span> {rec.cost} </span>;
  } else {
    return "";
  }
};

const FormattedIsbn = ({ source, record }) => {
  if (record[source] === undefined || record[source] === null) {
    return "";
  }
  let numberToConvert = record[source].toString();
  if (numberToConvert.length === 13) {
    let isbnFormated =
      numberToConvert.slice(0, 3) +
      "-" +
      numberToConvert.slice(3, 6) +
      "-" +
      numberToConvert.slice(6, 11) +
      "-" +
      numberToConvert.slice(11, 12) +
      "-" +
      numberToConvert.slice(12, 13);
    return isbnFormated;
  } else return record[source];
};

export const Lists = props => (
  <List {...props} bulkActionButtons={false} perPage={25}>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <ArrayField source="autor">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="code" />
      <FormattedIsbn source="isbn" /> {/*  <TextField source="isbn" /> */}
      {/* <InDatePriceField source="cost"></InDatePriceField> */}
      <ArrayField source="cost">
        <SingleFieldList>
          <ChipField source="cost" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

const BookTitle = ({ record }) => {
  return <span> {record ? `${record.title}` : ""} </span>;
};

export const Shows = props => {
  const classes = useStyles();
  return (
    <Show {...props} title={<BookTitle />}>
      <TabbedShowLayout>
        <Tab label="Generales">
          <TextField source="title" />
          <ArrayField source="autor">
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ArrayField>
          <TextField source="isbn" />
          <TextField source="code" />
          <ArrayField source="cost">
            <Datagrid>
              <DateField source="date" label="Fecha" />
              <NumberField
                source="cost"
                label="Precio"
                options={{
                  style: "currency",
                  currency: "ARS"
                }}
              />
            </Datagrid>
          </ArrayField>
          <ImageField
            className={classes.hasBorder}
            source="img.name"
            title="title"
            label="Tapa"
          />
        </Tab>
        <Tab label="Otros">
          <DateField source="year" />
          <TextField source="pages" />
          <TextField source="width" />
          <TextField source="height" />
          <TextField source="depth" />
          <TextField source="description" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export const Edits = props => {
  return (
    <Edit {...props} title={<BookTitle />} undoable={false}>
      <TabbedForm encType="multipart/form-data">
        <FormTab label="Generales">
          <TextInput source="title" label="Titulo" />
          <ArrayInput source="autor" label="Autor">
            <SimpleFormIterator>
              <ReferenceInput source="_id" reference="autores" label="">
                {/*   <SelectInput optionText="name" optionValue="_id" /> */}
                <AutocompleteInput optionText="name" optionValue="_id" />
              </ReferenceInput>
            </SimpleFormIterator>
          </ArrayInput>
          <NumberInput source="isbn" label="Isbn" />
          <TextInput source="code" label="Código" />
          <ImageInput source="img" label="Imagen de tapa" accept="image/*">
            <ImageField source="name" title="title" />
          </ImageInput>
          <ArrayInput source="cost">
            <SimpleFormIterator>
              <DateInput source="date" label="A partir de fecha" />
              <NumberInput source="cost" label="Valor" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="Otros">
          <DateInput source="year" label="Año" />
          <TextInput source="pages" label="Páginas" />
          <TextInput source="width" label="Ancho(cm)" />
          <TextInput source="height" label="Largo(cm)" />
          <TextInput source="depth" label="Lomo(cm)" />
          <TextInput
            source="description"
            label="Descripción"
            multiline={true}
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export const Creates = props => {
  return (
    <Create {...props} title={<BookTitle />}>
      <TabbedForm encType="multipart/form-data" redirect="list">
        <FormTab label="Generales">
          <TextInput source="title" label="Título" />
          <ArrayInput source="autor" label="Autor">
            <SimpleFormIterator>
              <ReferenceInput source="_id" reference="autores" label="">
                <SelectInput optionText="name" optionValue="_id" />
              </ReferenceInput>
            </SimpleFormIterator>
          </ArrayInput>
          <NumberInput source="isbn" label="Isbn" />
          <TextInput source="code" label="Código" />
          <ImageInput source="img" label="Imágen de tapa" accept="image/*">
            <ImageField source="name" title="title" />
          </ImageInput>
          <ArrayInput source="cost" label="Costo">
            <SimpleFormIterator>
              <DateInput source="date" label="A partir de fecha" />
              <NumberInput source="cost" label="Valor" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="Otros">
          <DateInput source="year" label="Año" />
          <TextInput source="pages" label="Páginas" />
          <TextInput source="width" label="Ancho(cm)" />
          <TextInput source="height" label="Largo(cm)" />
          <TextInput source="depth" label="Lomo(cm)" />
          <TextInput
            source="description"
            label="Descripción"
            multiline={true}
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
