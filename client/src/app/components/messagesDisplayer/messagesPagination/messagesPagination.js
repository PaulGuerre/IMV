'use client';

import { setMessages, setShowedMessages } from '@/store/messagesSlice';
import styles from './messagesPagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAnglesLeft, faAnglesRight, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function MessagesPagination() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { messages, showedMessages } = useSelector(state => state.messages);

    /**
     * Load the 100 next messages to the store
     */
    const nextMessages = () => {
        const lastShowedMessage = showedMessages[showedMessages.length - 1];
        const lastMessageIndex = messages.findIndex(message => message.timestamp_ms === lastShowedMessage.timestamp_ms);
        const nextMessages = messages.slice(lastMessageIndex + 1, lastMessageIndex + 101);

        dispatch(setShowedMessages(nextMessages));
    }

    /**
     * Load the 100 previous messages to the store
     */
    const previousMessages = () => {
        const firstShowedMessage = showedMessages[0];
        const firstMessageIndex = messages.findIndex(message => message.timestamp_ms === firstShowedMessage.timestamp_ms);
        const previousMessages = messages.slice(firstMessageIndex - 100, firstMessageIndex);

        dispatch(setShowedMessages(previousMessages));
    }

    /**
     * Filter the messages by date
     */
    const filterByDate = () => {
        const newMessages = messages.slice().reverse();
        const newShowedMessages = newMessages.slice(0, 100);

        dispatch(setMessages(newMessages));
        dispatch(setShowedMessages(newShowedMessages));
    }

    const isFirstBatch = messages.findIndex(message => message.timestamp_ms === showedMessages[0]?.timestamp_ms) === 0;
    const isLastBatch = messages.findIndex(message => message.timestamp_ms === showedMessages[showedMessages.length - 1]?.timestamp_ms) === messages.length - 1;

    return (
        <div className={styles.pagination}>
            <button className={styles.paginationButton} onClick={() => router.push('/users')}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button className={styles.paginationButton} disabled={isFirstBatch} onClick={previousMessages}><FontAwesomeIcon icon={faAnglesLeft} /></button>
            <button className={styles.paginationButton} onClick={filterByDate}><FontAwesomeIcon icon={faClockRotateLeft} /></button>
            <button className={styles.paginationButton} disabled={isLastBatch} onClick={nextMessages}><FontAwesomeIcon icon={faAnglesRight} /></button>
        </div>
    );
};
