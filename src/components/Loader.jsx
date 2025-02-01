import React from 'react'
import loader from "../assets/Brand Centro Floor Plan.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <img
          src={loader || "/placeholder.svg"}
          alt=""
          height={280}
          width={280}
        />
      </div>
  )
}

export default Loader
