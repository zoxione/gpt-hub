import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  let now = new Date();

  return (
    <>
      <div className=" py-[30px] px-[20px] max-w-7xl w-full mx-auto">
        {children}
      </div>
      <div className="mt-auto flex flex-row items-center justify-center p-8 bg-base-200">
        <span>
          © {now.getFullYear()} • Made by{" "}
          <a href="https://github.com/zoxione" target="_blank" className="link">
            zoxione
          </a>
        </span>
      </div>
    </>
  );
};

export default Layout;
