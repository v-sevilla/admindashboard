import React, { useEffect, useRef } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { notificationData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Notification = () => {
  const { currentColor, handleClick, isVisible } = useStateContext();
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target) && isVisible.notification) {
        handleClick('notification');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleClick, isVisible.notification]);

  const handleNotificationClick = () => {
    handleClick('notification');
  };

  return (
    <div 
     ref={notificationRef}
     className={`nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-lg ${isVisible.notification ? 'visible' : 'hidden'}`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme "> 5 New</button>
        </div>
        <Button icon={<MdOutlineCancel />} 
        color="rgb(153, 171, 180)" 
        bgHoverColor="light-gray" 
        size="2xl" 
        borderRadius="50%"  
        onClick={handleNotificationClick}/>
      </div>
      <div className="mt-5 ">
        {notificationData?.map((item, index) => (
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
            <img className="rounded-full h-10 w-10" src={item.image} alt={item.message} />
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <Button color="white" bgColor={currentColor} text="See all notifications" borderRadius="10px" width="full" />
        </div>
      </div>
    </div>
  );
};

export default Notification;