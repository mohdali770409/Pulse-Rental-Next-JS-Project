"use client";
import React, { useEffect, useState } from "react";
import {  useGlobalContext } from "@/context/GlobalContext";
const UnreadMessageCount = ({ session }) => {
  const {unread, setUnread} = useGlobalContext();
  useEffect(() => {
    if (!session) return;
    try {
      const fetchUnreadMessages = async () => {
        const res = await fetch(`/api/messages/unread-count`);
        if (res.status === 200) {
          const data = await res.json();
          setUnread(data);
        }
      };
      fetchUnreadMessages();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    unread > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unread}
      </span>
    )
  );
};

export default UnreadMessageCount;
