'use client';

import styles from './messagesDisplayer.module.css';
import { useSelector } from 'react-redux';
import MessagesPagination from './messagesPagination/messagesPagination';

export default function MessagesDisplayer() {
    const { participants, showedMessages } = useSelector(state => state.messages);

    return (
        <div>
            <div className={styles.messageDisplayer}>
                {
                    showedMessages.map((message, index) => {
                        const previousMessageSender = showedMessages[index - 1]?.sender_name;

                        return (
                            <div key={index} className={message.sender_name === participants[0] ? styles.messageSender1 : styles.messageSender2}>
                                { previousMessageSender !== message.sender_name && <div className={styles.messageSender}>{message.sender_name} the {new Date(message.timestamp_ms).toLocaleDateString()}</div> }
                                <div className={styles.messageContent}>{message.content}</div>
                            </div>
                        )
                    })
                }
            </div>
            <MessagesPagination />
        </div>           
    );
};
