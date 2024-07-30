import React, { ReactNode } from 'react'

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <div className="w-[90%]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container