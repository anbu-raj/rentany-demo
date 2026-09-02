import React, { useState } from 'react';
import { Send, Phone, MapPin, ShieldCheck, CheckCheck } from 'lucide-react';
import messagesData from '../data/messages.json';
import Button from '../components/ui/Button';
import styles from './MessagesPage.module.css';

export default function MessagesPage() {
  const [conversations, setConversations] = useState(messagesData);
  const [activeConvId, setActiveConvId] = useState(messagesData[0].id);
  const [inputMsg, setInputMsg] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: 'usr_001',
      text: inputMsg.trim(),
      timestamp: 'Just now',
      isMe: true
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: newMsg.text,
          lastMessageTime: 'Just now'
        };
      }
      return c;
    }));

    setInputMsg('');
  };

  return (
    <div className={`container ${styles.messagesPage}`}>
      <div className={styles.chatShell}>
        {/* Left: Conversations Inbox List */}
        <div className={styles.inboxSidebar}>
          <div className={styles.inboxHeader}>
            <h2>Messages</h2>
            <span className={styles.activeCount}>{conversations.length} Threads</span>
          </div>

          <div className={styles.convList}>
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                className={`${styles.convItem} ${c.id === activeConvId ? styles.convActive : ''}`}
              >
                <img src={c.participant.avatar} alt={c.participant.name} className={styles.convAvatar} />
                <div className={styles.convDetails}>
                  <div className={styles.convNameRow}>
                    <strong className={styles.convName}>{c.participant.name}</strong>
                    <span className={styles.convTime}>{c.lastMessageTime}</span>
                  </div>
                  <span className={styles.convItemTitle}>{c.listingTitle}</span>
                  <p className={styles.convSnippet}>{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Conversation Thread */}
        <div className={styles.chatArea}>
          {/* Chat Header */}
          <div className={styles.chatHeader}>
            <div className={styles.activeParticipant}>
              <img
                src={activeConv.participant.avatar}
                alt={activeConv.participant.name}
                className={styles.headerAvatar}
              />
              <div>
                <strong className={styles.headerName}>{activeConv.participant.name}</strong>
                <span className={styles.headerListing}>Re: {activeConv.listingTitle}</span>
              </div>
            </div>

            <div className={styles.headerRight}>
              <span className={styles.verifiedTag}>
                <ShieldCheck size={14} />
                <span>Verified Match</span>
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className={styles.messageList}>
            {activeConv.messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageBubble} ${m.isMe ? styles.bubbleMe : styles.bubbleThem}`}
              >
                <p className={styles.messageText}>{m.text}</p>
                <div className={styles.messageMeta}>
                  <span>{m.timestamp}</span>
                  {m.isMe && <CheckCheck size={14} className={styles.readCheck} />}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className={styles.inputArea}>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={`Message ${activeConv.participant.name.split(' ')[0]}...`}
              className={styles.msgInput}
            />
            <Button type="submit" size="md" variant="primary" icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
