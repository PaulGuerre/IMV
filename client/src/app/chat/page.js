'use client'

import MessagesDisplayer from "../components/messagesDisplayer/messagesDisplayer";
import MessagesStats from "../components/messagesStats/messagesStats";
import DataLoader from "../components/dataLoader/dataLoader";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { messages } = useSelector(state => state.messages);

  useEffect(() => {
    if (!messages.length) router.push('/');
  }, [])
  
  return (
    <>
      {
        !messages.length 
          ? <DataLoader />
          : (
            <>
              <MessagesStats />
              <MessagesDisplayer />
            </>
          )
      }
    </>
  );
};
