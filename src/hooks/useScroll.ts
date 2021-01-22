import React from "react";

const useScroll = () => {
  const [y, setY] = React.useState<number>(0);

  React.useEffect(() => {
    const handleWindowScroll = () => {
      setY(window.scrollY);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // Return the width so we can use it in our components
  return { y };
};

export default useScroll;