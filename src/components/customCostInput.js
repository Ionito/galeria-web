import React from "react";
import { SelectInput } from "react-admin";

const CustomCostInput = (props) => {
  const chois = props.choices[0].cost.map((i) => i);
  const optionRenderer = (choice) => {
    const f = new Date(choice.date);
    return `${
      choice.cost
    } - desde ${f.getDate()}/${f.getMonth()}/${f.getFullYear()}`;
  };

  return (
    <SelectInput
      choices={chois}
      defaultValue={chois[chois.length - 1].cost}
      label="Costo"
      optionText={optionRenderer}
      optionValue="cost"
      translateChoice={false}
      source={props.source}
    />
  );
};

export default CustomCostInput;
