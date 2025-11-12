import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types/database';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react-native';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return date.toLocaleDateString();
  };

  // Like functionality
  const handleLike = async (postId: string) => {
    try {
      // Check if user already liked the post
      const { data: existingLike, error: fetchError } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', supabase.auth.getUser()?.data.user?.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingLike) {
        // Unlike
        const { error: deleteError } = await supabase
          .from('likes')
          .delete()
          .eq('id', existingLike.id);

        if (deleteError) throw deleteError;
      } else {
        // Like
        const { error: insertError } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: supabase.auth.getUser()?.data.user?.id
          });

        if (insertError) throw insertError;
      }

      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      Alert.alert('Error', 'Failed to like post');
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.avatarContainer}>
          {item.profiles?.avatar_url ? (
            <Image source={{ uri: item.profiles.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {item.profiles?.username?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.profiles?.username || 'Unknown'}</Text>
          <Text style={styles.timestamp}>{formatTimeAgo(item.created_at)}</Text>
        </View>
      </View>

      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.postImage} resizeMode="cover" />
      ) : null}

      {(item.content || item.image_url) && (
        <View style={styles.postContent}>
          {item.content ? (
            <Text style={styles.contentText}>
              <Text style={styles.usernameInline}>{item.profiles?.username} </Text>
              {item.content}
            </Text>
          ) : null}
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item.id)}>
          <Heart color="#fff" size={20} />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle color="#fff" size={20} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Repeat2 color="#fff" size={20} />
          <Text style={styles.actionText}>Repost</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No posts yet. Create the first one!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  postContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: 'rgba(40, 40, 40, 0.7)',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#8a2be2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#2a2a2a',
  },
  postContent: {
    padding: 15,
  },
  contentText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  usernameInline: {
    fontWeight: '600',
    color: '#8a2be2',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
});