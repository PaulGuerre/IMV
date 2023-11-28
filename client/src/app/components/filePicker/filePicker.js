'use client'

import styles from './filePicker.module.css';
import Image from 'next/image';
import upload from '@/lib/icons/upload.svg';

export default function FilePicker({loadMessagesFromFolder}) {
    /**
     * Check if there is a file in the input, then if yes call the prop function
     */
    const getFile = () => {
      const fileInput = document.getElementById('folderPicker');
      fileInput.files[0] && loadMessagesFromFolder(fileInput.files[0]);
    }

    return (
      <div className={styles.filePicker}>
        <p className={styles.filePickerTitle}>Instagram Messages Visualizer</p>
        <button onClick={getFile} className={styles.filePickerButton}>Upload</button>
        <input hidden type="file" accept='.zip' id='folderPicker' />
        <div className={styles.filePickerInput} onClick={() => document.getElementById('folderPicker').click()}>
          <p className={styles.filePickerText}>Upload your zip file</p>
          <Image className={styles.filePickerIcon} src={upload} alt='Upload classic icon' />
        </div>
      </div>
    );
};
