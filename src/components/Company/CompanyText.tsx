import React from "react";
import "react-mosaic-component/react-mosaic-component.css";
import { CompanyEnums } from "../../enums/company";
import { CompanyTextProps } from "../../types/company";

const CompanyText: React.FC<CompanyTextProps> = ({ title, value }) => {
  return (
    <p className="mb-2 text-sm">
      <span className="font-bold mr-2">{CompanyEnums[title]}:</span>
      <span className="">{value}</span>
    </p>
  );
};

export default CompanyText;
