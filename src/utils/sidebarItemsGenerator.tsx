import { NavLink } from "react-router-dom";
import { TRole, TRoutes, TSidebarRoute } from "../types/index.type";

export const sidebarItemsGenerator = (items: TRoutes[], role: TRole) => {
  return items.reduce((acc: TSidebarRoute[], item) => {
    if (item.name && item.path && !item.children) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.name && item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child: TRoutes) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);
};
