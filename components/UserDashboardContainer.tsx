import React from 'react'

interface UserDashBoardContainerProps {
    children: React.ReactNode
}

const UserDashboardContainer: React.FC<UserDashBoardContainerProps> = ({children}) => {
    return (
        <div className="w-full h-full">
          <div className="flex justify-center">
            <div className="w-11/12">
              {children}
            </div>
          </div>
        </div>
      )
}

export default UserDashboardContainer