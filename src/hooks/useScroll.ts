import React from "react";

const useScroll = (setOpen) => {
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    const handleWindowScroll = () => {
      setY(window.scrollY);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [setOpen]);

  // Return the width so we can use it in our components
  return { y };
};

export default useScroll;