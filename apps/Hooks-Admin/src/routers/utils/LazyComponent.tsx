import React, { Suspense } from "react";
import { Spin } from "antd";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns React.ReactNode
 */
const LazyComponent = (Comp: React.LazyExoticComponent<React.ComponentType>) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  };

  return (
    <Suspense fallback={<Spin size="large" style={style} />}>
      <Comp />
    </Suspense>
  );
};

export default LazyComponent;
