import React, { useState, useEffect } from 'react';

const TypingText = ({ text, interval = 200 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isTyping) {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          // Start backspacing after typing completes
          setIsTyping(false);
          setCurrentIndex(text.length - 1); // Start backspacing from the end
        }
      } else {
        // Backspacing phase
        if (currentIndex >= 0) {
          setDisplayText((prevText) => prevText.slice(0, currentIndex));
          setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
          // Restart typing after backspacing completes
          setIsTyping(true);
          setCurrentIndex(0);
        }
      }
    }, isTyping ? interval : interval / 2); // Adjust interval for typing and backspacing

    return () => clearTimeout(timeoutId);
  }, [text, interval, isTyping, currentIndex]);

  return <span>{displayText}</span>;
};

export default TypingText;
