import React from "react";
import "react-mosaic-component/react-mosaic-component.css";
import { Company } from "../../types/company";
import CompanyText from "./CompanyText";
import { CompanyEnums } from "../../enums/company";

interface CompanyComponentProps {
  company: Company;
  currentTheme: any
}

const CompanyComponent: React.FC<CompanyComponentProps> = ({ company, currentTheme }) => {
  const textClass = currentTheme === "DarkTheme" ? "text-white" : "text-gray-900";
  return (
    <div className={`bg-slate-100 overflow-scroll ${textClass}`}>
      <div className="p-2">
        {Object.entries(company).map(([key, value]) => {
          if (key in CompanyEnums) {
            return (
              <CompanyText
                key={key}
                title={key as keyof typeof CompanyEnums}
                value={value}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CompanyComponent;
