import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useMatches } from "react-router-dom";
import { Icon } from "../../Icon";
import { useAppSelector } from "hooks";

const BreadcrumbNav: React.FC = () => {
  const matches: any = useMatches();
  const [breadcrumbList, setBreadcrumbList] = useState<any[]>([]);
  const { breadcrumbAllList } = useAppSelector(state => state.auth);
  const { breadcrumb, breadcrumbIcon } = useAppSelector(state => state.global);

  useEffect(() => {
    const loader = matches[matches.length - 1].data || {};
    let breadcrumbList = breadcrumbAllList[loader.key] || [];
    if (breadcrumbList[0]?.path !== "/home/index") {
      breadcrumbList = [{ path: "/home/index", meta: { icon: "HomeOutlined", title: "首页" } }, ...breadcrumbList];
    }
    setBreadcrumbList(
      breadcrumbList.map(item => {
        return {
          title: (
            <a>
              {breadcrumbIcon && <Icon name={item.meta.icon} />}
              <span className="ml5">{item.meta.title}</span>
            </a>
          )
        };
      })
    );
  }, [matches]);

  return <>{breadcrumb && <Breadcrumb items={breadcrumbList}></Breadcrumb>}</>;
};

export default BreadcrumbNav;
