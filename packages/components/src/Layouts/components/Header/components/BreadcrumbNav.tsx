import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useMatches } from "react-router-dom";
import { Icon } from "../../Icon";
import { useAppSelector } from "hooks";
import { MetaProps } from "store/module/interface";

const BreadcrumbNav: React.FC = () => {
  const matches = useMatches();
  const [breadcrumbList, setBreadcrumbList] = useState<ItemType[]>([]);
  const { breadcrumbAllList } = useAppSelector(state => state.auth);
  const { breadcrumb, breadcrumbIcon } = useAppSelector(state => state.global);

  useEffect(() => {
    const routeData = matches[matches.length - 1].data as MetaProps;
    if (routeData?.key) {
      let breadcrumbList = breadcrumbAllList[routeData.key] || [];
      if (breadcrumbList[0]?.path !== "/home/index") {
        breadcrumbList = [{ path: "/home/index", meta: { icon: "HomeOutlined", title: "首页" } }, ...breadcrumbList];
      }
      setBreadcrumbList(
        breadcrumbList.map(item => {
          return {
            title: (
              <>
                {breadcrumbIcon && <Icon name={item.meta!.icon!} />}
                <span>{item.meta?.title}</span>
              </>
            )
          };
        })
      );
    }
  }, [matches]);

  return <>{breadcrumb && <Breadcrumb items={breadcrumbList}></Breadcrumb>}</>;
};

export default BreadcrumbNav;
