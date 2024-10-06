import React, { useEffect, useState } from "react";
import { Classes, HTMLSelect } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicZeroState,
  updateTree,
} from "react-mosaic-component";
import dropRight from "lodash/dropRight";
import { Company } from "../../types/company";
import Window from "./Window";
import "../../react-mosaic-component.css";
import { Theme } from "../../types/theme";
import { THEMES } from "../../constants/theme";

const MosaicComponent: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<number> | null>({
    direction: "row",
    first: 1,
    second: {
      direction: "column",
      first: 2,
      second: 3,
    },
    splitPercentage: 40,
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>("Blueprint");
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/companies-lookup.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIdsFromMosaic = () => {
    const leaves = getLeaves(currentNode);
    const ids = leaves.map((leaf) => leaf);
    return ids;
  };

  const generateUniqueId = () => {
    const idss = getIdsFromMosaic();
    let newId;

    do {
      newId = Math.floor(Math.random() * data.length) + 1;
    } while (idss.includes(newId));

    return newId;
  };

  const onChange = (newNode: MosaicNode<number> | null) => {
    setCurrentNode(newNode);
  };

  const onRelease = (newNode: MosaicNode<number> | null) => {
    console.log("Mosaic.onRelease():", newNode);
  };

  const autoArrange = () => {
    const leaves = getLeaves(currentNode);
    setCurrentNode(createBalancedTreeFromLeaves(leaves));
  };

  const addToTopRight = () => {
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(
        currentNode,
        dropRight(path)
      ) as MosaicParent<number>;
      const destination = getNodeAtPath(
        currentNode,
        path
      ) as MosaicNode<number>;
      const direction: MosaicDirection = parent
        ? getOtherDirection(parent.direction)
        : "row";
      const newId = generateUniqueId();
      let first: MosaicNode<number>;
      let second: MosaicNode<number>;
      if (direction === "row") {
        first = destination;
        second = newId;
      } else {
        first = newId;
        second = destination;
      }

      setCurrentNode(
        updateTree(currentNode, [
          {
            path,
            spec: {
              $set: {
                direction,
                first,
                second,
              },
            },
          },
        ])
      );
    } else {
      setCurrentNode(generateUniqueId);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalWindowCount = getLeaves(currentNode).length;

  return (
    <div className="h-full flex-1">
      {renderNavBar(currentTheme, setCurrentTheme, autoArrange, addToTopRight)}
      <Mosaic<number>
        renderTile={(count, path) => (
          <Window
            count={count}
            path={path}
            data={data}
            generateUniqueId={generateUniqueId}
            currentTheme={currentTheme}
          />
        )}
        zeroStateView={
          <MosaicZeroState createNode={() => generateUniqueId()} />
        }
        value={currentNode}
        onChange={onChange}
        onRelease={onRelease}
        className={`${THEMES[currentTheme]} h-95p`}
        blueprintNamespace="bp5"
      />
    </div>
  );
};

const renderNavBar = (
  currentTheme: Theme,
  setCurrentTheme: React.Dispatch<React.SetStateAction<Theme>>,
  autoArrange: () => void,
  addToTopRight: () => void
) => {
  return (
    <div
      className={`${classNames(
        Classes.NAVBAR,
        Classes.DARK
      )} flex justify-between items-center gap-4 sm:h-min h-min`}
    >
      <p className="m-0">
        react mosaic <span className="">v.6.1.0</span>
      </p>
      <div className={`flex items-center sm:gap-4 gap-2 sm:flex-nowrap flex-wrap`}>
        <label>
          <span className="mr-2 md:mb-0 mb-2">Theme:</span>
          <HTMLSelect
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.currentTarget.value as Theme)}
          >
            {Object.keys(THEMES).map((label) => (
              <option key={label}>{label}</option>
            ))}
          </HTMLSelect>
        </label>
        <div className="flex gap-2 items-center sm:flex-nowrap flex-wrap">
          <span className="actions-label">Example Actions:</span>
          <div className="flex">
            <button
              className={`${classNames(
                Classes.BUTTON,
                Classes.iconClass(IconNames.GRID_VIEW)
              )} shadow-lg shadow-right-none`}
              onClick={autoArrange}
            >
              Auto Arrange
            </button>
            <button
              className={`${classNames(
                Classes.BUTTON,
                Classes.iconClass(IconNames.ARROW_TOP_RIGHT)
              )} shadow-lg shadow-left-none`}
              onClick={addToTopRight}
            >
              Add Window to Top Right
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MosaicComponent;
