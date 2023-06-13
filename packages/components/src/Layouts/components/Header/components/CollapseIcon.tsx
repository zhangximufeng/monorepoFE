import * as React from "react";
import { setGlobalState } from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const CollapseIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCollapse } = useAppSelector(state => state.global);
  return (
    <>
      {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "collapsed",
        onClick: () => dispatch(setGlobalState({ key: "isCollapse", value: !isCollapse }))
      })}
    </>
  );
};

export default CollapseIcon;
