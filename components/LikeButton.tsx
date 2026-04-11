'use client';

import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, increment, updateDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useAuth } from './AuthProvider';
import { motion, AnimatePresence } from 'motion/react';

interface LikeButtonProps {
  postId: string;
  initialLikes?: number;
}

export function LikeButton({ postId, initialLikes = 0 }: LikeButtonProps) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Listen to post likes count
    const unsubscribePost = onSnapshot(doc(db, 'posts', postId), (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().likesCount || 0);
      }
    });

    // Check if user liked this post
    let unsubscribeLike = () => {};
    if (user) {
      const likeId = `${user.uid}_${postId}`;
      unsubscribeLike = onSnapshot(doc(db, 'likes', likeId), (docSnap) => {
        setIsLiked(docSnap.exists());
      });
    }

    return () => {
      unsubscribePost();
      unsubscribeLike();
    };
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) {
      alert('Please sign in to like articles.');
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    const likeId = `${user.uid}_${postId}`;
    const likeRef = doc(db, 'likes', likeId);
    const postRef = doc(db, 'posts', postId);

    try {
      if (isLiked) {
        // Unlike
        await deleteDoc(likeRef);
        await updateDoc(postRef, {
          likesCount: increment(-1)
        });
      } else {
        // Like
        await setDoc(likeRef, {
          userId: user.uid,
          postId: postId,
          createdAt: new Date()
        });
        await updateDoc(postRef, {
          likesCount: increment(1)
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `posts/${postId}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isProcessing}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all active:scale-95 ${
        isLiked 
          ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
          : 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800'
      }`}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      </motion.div>
      <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
}
