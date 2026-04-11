'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useAuth } from './AuthProvider';
import { Comment } from '@/types';
import { MessageSquare, Send, Trash2, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatDate } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'posts', postId, 'comments'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(commentsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `posts/${postId}/comments`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to comment.');
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        postId,
        userId: user.uid,
        userName: profile?.displayName || user.displayName || 'Anonymous',
        userPhoto: profile?.photoURL || user.photoURL || null,
        content: newComment.trim(),
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `posts/${postId}/comments`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${postId}/comments/${commentId}`);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-6">
        <MessageSquare className="w-6 h-6 text-red-600" />
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="Me" className="w-10 h-10 rounded-full" />
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400" />
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Join the conversation..."
                className="flex-1 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all dark:text-white"
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-zinc-400 mb-4">Please sign in to join the discussion.</p>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-4 group"
            >
              {comment.userPhoto ? (
                <img src={comment.userPhoto} alt={comment.userName} className="w-10 h-10 rounded-full flex-shrink-0" />
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400 flex-shrink-0" />
              )}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">{comment.userName}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt, 'MMM d, h:mm a')}
                    </span>
                  </div>
                  {(user?.uid === comment.userId || profile?.role === 'admin') && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && comments.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-zinc-500 italic">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
}
