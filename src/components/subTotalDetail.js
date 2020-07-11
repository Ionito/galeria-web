import React from "react";
import { Field, useForm } from "react-final-form";

const SubTotalDetail = (props) => {
  const form = useForm();
  const cliente = props.allClients.filter(
    (client) => client._id === props.formData.cliente
  );
  const descuento = cliente[0].discount;
  form.change("descuento", descuento);
  const subsubtotal =
    props.formData.detalle[0] !== undefined
      ? props.formData.detalle.map((libro) =>
          libro &&
          libro.hasOwnProperty("cantidad") &&
          libro.hasOwnProperty("costo")
            ? libro.cantidad * libro.costo
            : 0
        )
      : 0;
  const subtotal =
    subsubtotal !== 0
      ? subsubtotal.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      : 0;
  const total = subtotal - (subtotal * descuento) / 100;
  form.change("total", total);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: "30%", textAlign: "center" }}>
        <strong>Descuento </strong>
        {descuento}
      </div>
      <div style={{ width: "30%", textAlign: "center" }}>
        <strong>Subtotal </strong>
        {subtotal}
      </div>
      <div style={{ width: "30%", textAlign: "center" }}>
        <strong>Total </strong>
        {total}
      </div>
      <Field name="descuento" component="input" type="hidden" />
    </div>
  );
};

export default SubTotalDetail;
