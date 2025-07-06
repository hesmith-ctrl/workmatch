import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from './ProfileCard';

const SwipeStack = ({ profiles, onSwipe, onUndo, canUndo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const stackRef = useRef(null);
  const animationRef = useRef(null);

  const visibleCards = profiles.slice(currentIndex, currentIndex + 3);

  const handleSwipe = (direction) => {
    if (currentIndex >= profiles.length) return;

    const profile = profiles[currentIndex];
    onSwipe(profile, direction);
    
    // Animate card out
    animateCardOut(direction, () => {
      setCurrentIndex(prev => prev + 1);
      setDragOffset({ x: 0, y: 0 });
    });
  };

  const animateCardOut = (direction, callback) => {
    const targetX = direction === 'right' ? window.innerWidth : -window.innerWidth;
    const targetY = direction === 'right' ? -100 : 100;
    
    let progress = 0;
    const animate = () => {
      progress += 0.1;
      if (progress >= 1) {
        callback();
        return;
      }
      
      setDragOffset({
        x: targetX * progress,
        y: targetY * progress
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const handleMouseDown = (e) => {
    if (currentIndex >= profiles.length) return;
    
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    if (currentIndex >= profiles.length) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY * 0.3 });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY * 0.3 });
  };

  const handleMouseUp = () => {
    handleDragEnd();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      handleSwipe(direction);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleUndo = () => {
    if (canUndo && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      onUndo();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex >= profiles.length) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handleSwipe('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSwipe('right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          console.log('Super like');
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleUndo();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, profiles.length, canUndo]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (currentIndex >= profiles.length) {
    return null;
  }

  return (
    <div
      ref={stackRef}
      className="relative w-full h-full"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {visibleCards.map((profile, index) => {
        const cardIndex = currentIndex + index;
        const isTopCard = index === 0;
        const zIndex = visibleCards.length - index;
        const scale = 1 - (index * 0.05);
        const translateY = index * 8;
        
        return (
          <ProfileCard
            key={`${profile.id}-${cardIndex}`}
            profile={profile}
            onSwipe={handleSwipe}
            isTopCard={isTopCard}
            isDragging={isTopCard && isDragging}
            dragOffset={isTopCard ? dragOffset : { x: 0, y: 0 }}
            style={{
              zIndex,
              transform: isTopCard 
                ? undefined 
                : `scale(${scale}) translateY(${translateY}px)`,
              opacity: 1 - (index * 0.1)
            }}
          />
        );
      })}
    </div>
  );
};

export default SwipeStack;