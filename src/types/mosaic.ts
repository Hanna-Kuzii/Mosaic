import { MosaicBranch } from "react-mosaic-component";
import { Company } from "./company";

export interface WindowProps {
  count: number;
  path: MosaicBranch[];
  data: Company[];
  generateUniqueId: any;
  currentTheme: any;
}
