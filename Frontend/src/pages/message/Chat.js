import React from 'react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { LuCopy } from 'react-icons/lu'; 
import styles from './message.module.css';

function Chat({ text, own, isLoading = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    });
  };

  return (
    <div className={`${styles.chat} ${own && styles.own}`}>
      <Markdown>{text}</Markdown>
      {!own && !isLoading && (
        <button onClick={handleCopy} className={styles.copyButton}>
          <LuCopy />
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      {isLoading && <div className={styles.loadCursor}></div>}
    </div>
  );
}

export default Chat;
