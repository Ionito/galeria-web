import React from "react";
import {
  Admin,
  Resource,
  EditGuesser,
  ListGuesser,
  ShowGuesser,
} from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import myDataProvider from "./services/dataProvider";
import authProvider from "./services/authProvider";
/* import englishMessage from "ra-language-english"; */
import esp from "./lang/esp";

import * as clientes from "./components/clients";
import * as libros from "./components/books";
import * as autores from "./components/autors";
import * as facturas from "./components/facturas";
import * as remitos from "./components/remitos";

import MovimientosLog from "./components/movimientos";

import Dashboard from "./components/Dashboard";

import MyLoginPage from "./components/loginPage";

import UserIcon from "@material-ui/icons/People";
import BookIcon from "@material-ui/icons/MenuBook";
import AutorIcon from "@material-ui/icons/Face";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AssignmentIcon from "@material-ui/icons/Assignment";

const i18nProvider = polyglotI18nProvider((locale) => esp, "en", {
  allowMissing: true,
});

const App = () => (
  <Admin
    dashboard={Dashboard}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    dataProvider={myDataProvider}
    loginPage={MyLoginPage}
  >
    <Resource
      icon={ListAltIcon}
      name="facturas"
      list={facturas.Lists}
      show={facturas.Shows}
      /*      edit={BookEdit}*/
      create={facturas.Creates}
    />

    <Resource
      name="remitos"
      list={remitos.Lists}
      icon={AssignmentIcon}
      show={remitos.Shows}
      create={remitos.Creates}
    />

    <Resource
      icon={UserIcon}
      name="clientes"
      list={clientes.Lists}
      show={clientes.Shows}
      edit={clientes.Edits}
      create={clientes.Creates}
    />

    <Resource
      icon={BookIcon}
      name="libros"
      list={libros.Lists}
      show={libros.Shows}
      edit={libros.Edits}
      create={libros.Creates}
    />

    <Resource
      icon={AutorIcon}
      name="autores"
      list={autores.Lists}
      /* show={ShowGuesser} */
      edit={autores.Edits}
      create={autores.Creates}
    />

    <Resource name="movimientos" list={MovimientosLog} />
  </Admin>
);

export default App;
