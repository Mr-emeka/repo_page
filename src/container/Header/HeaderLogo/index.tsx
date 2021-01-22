import React from 'react';

type Props = {
  logo: any,
}

const HeaderLogo: React.FC<Props> = ({logo}) => {
  return <div className="logo"> 
  {logo}
        
        </div>;
}

export default HeaderLogo;