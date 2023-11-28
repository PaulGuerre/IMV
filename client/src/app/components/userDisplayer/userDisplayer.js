'use client'

import Image from 'next/image';
import user from "@/lib/icons/user.svg";
import styles from "./userDisplayer.module.css";

export default function UserDisplayer({ userName, loadMessages }) {
    const formattedUsername = userName.split('/')[2].split('_').slice(0, -1).join('_');

    return (
        <div className={styles.userContainer} onClick={() => loadMessages(userName)}>
            <Image className={styles.userIcon} src={user} alt='User classic icon' />
            <p className={styles.userName}>{formattedUsername}</p>
        </div>
    );
};
