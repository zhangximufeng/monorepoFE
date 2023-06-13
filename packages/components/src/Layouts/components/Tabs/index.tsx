import * as React from "react";
import { useRef, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { useAppSelector } from "hooks";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MoreButton from "./components/MoreButton";
import * as Icons from "@ant-design/icons";
import "./index.less";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const type = "DraggableTabNode";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key;
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

const DraggableTabNode = ({ index, children, moveNode }: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return { isOver: monitor.isOver() };
    },
    drop: (item: { index: React.Key }) => moveNode(item.index, index)
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  });
  drop(drag(ref));
  return <div ref={ref}>{children}</div>;
};

const DraggableTabs: React.FC<TabsProps> = ({ items = [] }) => {
  const [order, setOrder] = useState<React.Key[]>([]);

  const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
    console.log(dragKey, hoverKey);
    const newOrder = order.slice();
    items.forEach(item => {
      if (item.key && newOrder.indexOf(item.key) === -1) {
        newOrder.push(item.key);
      }
    });
    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);
    setOrder(newOrder);
  };

  const renderTabBar: TabsProps["renderTabBar"] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      {(node: any) => (
        <DraggableTabNode key={node.key} index={node.key!} moveNode={moveTabNode}>
          {node}
        </DraggableTabNode>
      )}
    </DefaultTabBar>
  );

  const orderItems = [...items].sort((a, b) => {
    const orderA = order.indexOf(a.key!);
    const orderB = order.indexOf(b.key!);
    if (orderA !== -1 && orderB !== -1) return orderA - orderB;
    if (orderA !== -1) return -1;
    if (orderB !== -1) return 1;
    const ia = items.indexOf(a);
    const ib = items.indexOf(b);
    return ia - ib;
  });

  const [activeKey, setActiveKey] = useState("/home/index");

  const onChange = (path: string) => {
    console.log(path);
    setActiveKey(path);
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      console.log(targetKey);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs
        animated
        hideAdd
        type="editable-card"
        className="tabs-box"
        size="middle"
        renderTabBar={renderTabBar}
        items={orderItems}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        tabBarExtraContent={MoreButton()}
      />
    </DndProvider>
  );
};

const customIcons: { [key: string]: any } = Icons;

const LayoutTabs: React.FC = () => {
  const { tabsList } = useAppSelector(state => state.tabs);
  const { tabs, tabsIcon } = useAppSelector(state => state.global);
  const createTabsIcon = (icon: string) => React.createElement(customIcons[icon], { style: { marginRight: "9px" } });
  const items = tabsList.map(item => {
    return {
      key: item.path,
      label: (
        <span>
          {tabsIcon && createTabsIcon(item.icon)}
          {item.title}
        </span>
      ),
      closable: item.closable
    };
  });

  return <>{tabs && <DraggableTabs items={items} />}</>;
};

export default LayoutTabs;
