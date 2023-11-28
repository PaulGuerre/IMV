'use client'

import { useDispatch } from 'react-redux';
import { setFileID } from '../store/messagesSlice';
import { sendFile } from '../utils/api';
import { useRouter } from "next/navigation";
import DataLoader from './components/dataLoader/dataLoader';
import { useState } from "react";
import FilePicker from "./components/filePicker/filePicker";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();  

  const [ loading, setLoading ] = useState(false);
  
  /**
   * Generate a random name depending on the number
   * @param {Number} length 
   * @returns 
   */
  const randomName = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  /**
   * Send the file to the server
   * @param {Event} event 
   */
  const loadMessagesFromFolder = (file) => {
    setLoading(true);
    // const fileInput = document.getElementById('folderPicker');
    // const file = fileInput.files[0];

    const newFileName = randomName(30);
    dispatch(setFileID(newFileName));

    const updatedFile = new File([file], `${newFileName}.zip`, { type: file.type });

    const formData = new FormData();
    formData.append('file', updatedFile);

    sendFile(formData).then(response => {
      router.push('/users');
    });
  };

  return (
    <>
      {
        loading 
          ? <DataLoader />
          : <FilePicker loadMessagesFromFolder={(file) => loadMessagesFromFolder(file)} />
      }
    </>
  );
};
