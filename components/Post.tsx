import Link from 'next/link'
import styles from '../styles/Post.module.css'
import { useMemo, useState } from 'react'
import { Button } from '@mui/material'
import type { PostType, CommentType } from '../types/post_type'
import Comment from './Comment'
import CommentForm from './CommentForm'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const Post = (props: PostType) => {
  const [showMore, setShowMore] = useState(false)
  const [post, setPost] = useState(props)

  const commentsByParentId = useMemo(() => {
    const commentsByParentId: any = {}
    post?.comments?.forEach((comment) => {
      if (post.comments == null) {
        return []
      }
      commentsByParentId[comment.parentId] =
        commentsByParentId[comment.parentId] || []
      commentsByParentId[comment.parentId].push(comment)
    })
    return commentsByParentId
  }, [post])

  const rootComments = commentsByParentId[null as any] || []

  const getReplies = (parentId: any) => {
    if (commentsByParentId[parentId] == null) {
      return []
    }
    return commentsByParentId[parentId]
  }

  const refeshPost = async () => {
    const res = await axios.post('http://localhost:3000/api/post', {
      id: props.id,
    })
    setPost(res.data)
  }

  const submitComment = async (
    e: any,
    text: string,
    postId: string,
    reset: any
  ) => {
    e.preventDefault()
    await axios.post(
      'http://localhost:3000/api/create/comment',
      {
        message: text,
        postId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('user-token')}`,
        },
      }
    )
    reset()
    refeshPost()
  }

  const submitReply = async (
    e: any,
    text: string,
    postId: string,
    parentId: string,
    reset: any
  ) => {
    e.preventDefault()
    const resp = await axios.post(
      'http://localhost:3000/api/create/reply',
      {
        message: text,
        postId: postId,
        parentId: parentId,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('user-token')}`,
        },
      }
    )
    console.log(resp)
    reset()
    refeshPost()
  }

  return (
    <div className={styles.card}>
      <h2>{post.title}</h2>
      <article>{showMore ? post.body : post.body.slice(0, 150)}</article>
      {post.body.length >= 150 && (
        <Button
          variant="text"
          color="primary"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'show less' : 'show more'}
        </Button>
      )}
      <h3>Comments 💬</h3>
      <CommentForm postId={post.id} submit={submitComment} />
      <div>
        {rootComments?.map((comment: CommentType) => (
          <Comment
            postId={post.id}
            refresh={refeshPost}
            key={comment.id}
            comment={comment}
            getReplies={getReplies}
            handleSubmitReply={submitReply}
          />
        ))}
      </div>
    </div>
  )
}

export default Post
