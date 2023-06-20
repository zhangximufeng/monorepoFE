import { useEffect } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import { HOME_URL, LOGIN_URL } from "@/config";
import { MetaProps } from "@/routers/interface";

/**
 * @description Route guard component
 */
interface RouterGuardProps {
  children: JSX.Element;
}

const RouterGuard = (props: RouterGuardProps) => {
  const matches = useMatches();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = useAppSelector(state => state.user.token);

  useEffect(() => {
    // set document title
    const meta = matches[matches.length - 1].data as MetaProps;
    if (meta) {
      const title = import.meta.env.VITE_GLOB_APP_TITLE;
      document.title = meta?.title ? `${meta.title} - ${title}` : title;
    }

    // If the page accessed by token && is login, redirect to the home page
    if (token && pathname === LOGIN_URL) {
      return navigate(HOME_URL);
    }

    // If there is no token && the accessed page is not login, redirect to the login page
    if (!token && pathname !== LOGIN_URL) {
      return navigate(LOGIN_URL, { replace: true });
    }
  }, [matches]);

  return props.children;
};

export default RouterGuard;
