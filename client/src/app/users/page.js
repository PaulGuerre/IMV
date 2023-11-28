'use client'

import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getUsers } from "../../utils/api";
import { useEffect, useState } from "react";
import { setMessages, setParticipants, setShowedMessages } from "@/store/messagesSlice";
import { useRouter } from "next/navigation";
import DataLoader from "../components/dataLoader/dataLoader";
import UserDisplayer from "../components/userDisplayer/userDisplayer";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { fileID } = useSelector(state => state.messages);

  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (fileID) {
      getUsers(fileID).then(response => {
        setUsers(Object.values(response.data));
      });
    } else {
      router.push('/');
    }
  }, []);

  /**
   * Load messages from the selected user and then push to the chat page
   * @param {String} user 
   */
  const loadMessages = (user) => {
    setLoading(true);

    getMessages(fileID, user).then(response => {
      dispatch(setMessages(response.data.messages));
      dispatch(setParticipants(response.data.participants));
      dispatch(setShowedMessages(response.data.messages.slice(0, 100)));

      router.push('/chat');
    })
  };

  return (
    <>
      {
        !users.length || loading 
          ? <DataLoader />
          : <div className={styles.usersContainer}>
            { users.map(user => <UserDisplayer key={user.id} userName={user} loadMessages={loadMessages} />) }
          </div>
      }
    </>
  );
};
