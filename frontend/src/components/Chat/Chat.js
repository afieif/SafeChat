/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../firebase';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import ChatroomBar from './ChatroomBar';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [disableText, setDisableText] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesRef = collection(db, 'messages');
  const room = 'safe_chat';
  const dummy = useRef();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setTimeout(()=>dummy.current.scrollIntoView({ behavior: 'smooth' }),0);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function addMessage(msg){
    await addDoc(messagesRef, {
      text: msg,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      pfp: auth.currentUser.photoURL,
      room: room,
    });
    setDisableText(false);
    setNewMessage('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === '') return;
    setNewMessage('Sending...')
    setDisableText(true);
  
      fetch('http://127.0.0.1:5000/detox', {
        method: 'POST',
        body: JSON.stringify({
          "text" : newMessage
        })
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data.text);
            addMessage(data.text)
         })
         .catch((err) => {
            console.log(err.message);
         });

  };

  return (
    <div className='chat-parent'>
      <ChatroomBar name={room} />
      <div className='messages'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.uid === auth.currentUser.uid
                ? 'chat-bubble sender'
                : 'chat-bubble'
            }
          >
            {message.uid === auth.currentUser.uid ? (
              <>
                <div class='message-container'>
                  <p class='sender-name'>{message.user}</p>
                  <p class='message'>{message.text}</p>
                </div>
              </>
            ) : (
              <>
                <div class='message-container'>
                  <p class='sender-name'>{message.user}</p>
                  <p class='message'>{message.text}</p>
                </div>
              </>
            )}
          </div>
        ))}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={handleSubmit} autocomplete="off">
        <div class='chat-textbox'>
          <input
            id='message-input'
            type='text'
            disabled={disableText}
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder='Type your message here...'
          />
          <button id='send-button' type='submit'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}