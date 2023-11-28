'use client';

import styles from './messagesStats.module.css';
import { useSelector } from 'react-redux';

export default function MessagesStats() {
    const { messages, participants } = useSelector(state => state.messages);
    
    const totalMessages = messages.length;
    const oldestMessage = messages.length && messages.reduce((oldestMessage, currentMessage) => {
        return oldestMessage.timestamp_ms < currentMessage.timestamp_ms ? oldestMessage : currentMessage;
    });
    const firstMessage = new Date(oldestMessage.timestamp_ms).toLocaleDateString();

    return (
        <div className={styles.stats}>
            <div className={styles.stat}>
                <p className={styles.statTitle}>Total messages</p>
                <p className={styles.statNumber}>{totalMessages}</p>
            </div>

            {
                participants.map(participant => {
                    return (
                        <div key={participant.id} className={styles.stat}>
                            <p className={styles.statTitle}>Total messages from {participant}</p>
                            <p className={styles.statNumber}>{messages.filter(message => message.sender_name === participant).length}</p>
                        </div>
                    );
                })
            }

            <div className={styles.stat}>
                <p className={styles.statTitle}>First message</p>
                <p className={styles.statDate}>{firstMessage}</p>
            </div>
        </div>
    );
};
