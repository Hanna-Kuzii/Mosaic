import {
  DEFAULT_CONTROLS_WITH_CREATION,
  MosaicWindow,
} from "react-mosaic-component";
import CompanyComponent from "../Company/Company";
import { WindowProps } from "../../types/mosaic";
import { useRef, useState } from "react";

const Window: React.FC<WindowProps> = ({
  count,
  path,
  data,
  generateUniqueId,
  currentTheme,
}) => {
  const adContainer = useRef<HTMLDivElement>(null);
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const textClass =
    currentTheme === "DarkTheme" ? "text-white" : "text-gray-900";

  const getToolbarControls = () => {
    return [...DEFAULT_CONTROLS_WITH_CREATION];
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFramework(e.target.value);
  };
  const select = (
    <div className="relative inline-block">
      <select
        name="framework"
        id="framework"
        className={`block appearance-none w-full bg-transparent border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${textClass}`}
        value={selectedFramework}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select framework...
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-col justify-center items-center px-2 text-gray-700">
        <svg
          className="stroke-current w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
        <svg
          className="stroke-current w-3 h-3 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M18 9l-6 6-6-6" />
        </svg>
      </div>
    </div>
  );
  const title = (
    <p className="text-xl text-gray-700 font-bold m-0">Company info</p>
  );
  const renderToolbarControls = ({ count }: { count?: any }) => {
    const toolbarControls = count !== 3 ? getToolbarControls() : [];
    return (
      <div className="w-full flex justify-between">
        <div className="flex gap-4 items-center">
          {title}
          {select}
        </div>
        <div className="">{toolbarControls}</div>
      </div>
    );
  };
  const renderToolbar = (count: number) => {
    return (
      <div className="flex gap-2 p-2 w-full justify-center">
        <div className="flex-2">{select}</div>
        <div className="flex-1 text-center">{title}</div>
      </div>
    );
  };

  return (
    <MosaicWindow<number>
      title=""
      createNode={() => generateUniqueId()}
      path={path}
      toolbarControls={renderToolbarControls({
        count,
      })}
      renderToolbar={count === 3 ? () => renderToolbar(count) : null}
    >
      <div className="overflow-scroll">
        {count <= data.length && (
          <CompanyComponent
            company={data[count - 1]}
            currentTheme={currentTheme}
          />
        )}
        {count === 3 && <div ref={adContainer} />}
      </div>
    </MosaicWindow>
  );
};

export default Window;
