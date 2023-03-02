import { memo, useEffect, useMemo } from "react";
import ReactFlow, {
  Controls,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { useSelector } from "react-redux";

import ColorSelectorNode from "./ColorSelectorNode";

import "./index.css";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const Index = () => {
  const { cart } = useSelector((state) => state.dashboard);
  const cartItems = useMemo(() => {
    return cart?.items || [];
  }, [cart]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const components = useMemo(() => {
    return cartItems.filter((item) => item.blockType === "component") || [];
  }, [cartItems]);

  const mcu = cartItems.find((item) => item.blockType === "mcu");
  useEffect(() => {
    const nodesData = [
      {
        id: mcu.productId,
        type: "selectorNode",

        data: {
          label: mcu.partNumber,
          dots: components.map((e, index) => {
            return {
              type: "source",
              position: "left",
              id: e.productId,
              style: {
                bottom: (index + 1) % 2 === 0 ? "auto" : index * 5,
                top: (index + 1) % 2 !== 0 ? "auto" : (index - 1) * 5,
                background: "#555",
              },
            };
          }),
        },
        style: {
          border: "1px solid #777",
          padding: 8,
          borderRadius: "8px",
        },
        position: { x: 650, y: 0 },
      },
    ].concat(
      components.map((comp, index) => {
        return {
          id: comp.productId,
          data: {
            label: comp.partNumber,
            color: comp.color,
            quantity: comp.quantity,
          },
          position: {
            x: 650,
            y:
              (index + 1) % 2 !== 0
                ? (index + 1) * 50 - Math.floor((index + 1) / 2) * 50
                : -((index + 1) * 50 - Math.floor((index + 1) / 2) * 50),
          },
          targetPosition: "left",
        };
      })
    );

    setNodes(nodesData);
    const edgeData = components.map((comp, index) => {
      return {
        id: `e-${mcu.productId}-${comp.productId}`,
        source: mcu.productId,
        target: comp.productId,
        sourceHandle: comp.productId,

        // type: "smoothstep",
        type: "step",
      };
    });
    console.log("edgeData", edgeData);
    console.log("nodesData", nodesData);

    setEdges(edgeData);
  }, [components, mcu, setEdges, setNodes]);

  if (!mcu) {
    return null;
  }

  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1.5}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default memo(Index);
