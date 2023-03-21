import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className=" py-[30px] p-[20px] max-w-7xl mx-auto">{children}</div>
      <div className="flex flex-row items-center justify-center p-8 bg-base-200">
        <a href="https://github.com/zoxione" target="_blank" className="link">
          @zoxione
        </a>
        , 2023
      </div>
    </>
  );
};

export default Layout;
