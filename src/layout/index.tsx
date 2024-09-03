import { FC, ReactElement } from "react";

// App's main layout for header footer background etc.
const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div className="py-5 h-screen bg-gradient-to-tr from-blue-300 to-blue-500">
      {children}
    </div>
  );
};

export default Layout;
