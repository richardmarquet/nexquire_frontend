import React, { ReactNode } from 'react'

interface DashboardContainerProps {
    children: React.ReactNode;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <div className="w-[95%]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer