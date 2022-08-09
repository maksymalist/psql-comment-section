import styles from '../styles/Comment.module.css'
import { useMemo, useState, useEffect } from 'react'
import { Button, IconButton } from '@mui/material'
import { Reply, Favorite, FavoriteBorder } from '@mui/icons-material'
import type { CommentType } from '../types/post_type'
import ReplyForm from './ReplyForm'
import axios from 'axios'
import { getCookie } from 'cookies-next'

type Props = {
  comment: CommentType
  getReplies: (parentId: any) => any[]
  handleSubmitReply: (
    e: any,
    text: string,
    postId: string,
    parentId: string,
    reset: any
  ) => void
  postId: string
  refresh: any
}

const Comment = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const [childrenHidden, setChildrenHidden] = useState(false)
  const fmDate = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeStyle: 'medium',
      dateStyle: 'short',
    })
    return (date: any) => formatter.format(new Date(date))
  }, [])

  const [liked, setLiked] = useState(false)

  const childComments = props.getReplies(props.comment.id)

  const likeComment = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/create/like',
        {
          commentId: props.comment.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('user-token')}`,
          },
        }
      )
      props.refresh()
      setLiked(true)
    } catch (error) {
      setLiked(false)
    }
  }

  const unlikeComment = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/delete/like',
        {
          commentId: props.comment.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('user-token')}`,
          },
        }
      )
      props.refresh()
      setLiked(false)
    } catch (error) {
      console.log(error)
    }
  }

  const checkLiked = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/find/liked',
        {
          commentId: props.comment.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('user-token')}`,
          },
        }
      )
      if (res.data.liked) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    } catch (error) {
      console.log(error)
      setLiked(false)
    }
  }

  useEffect(() => {
    checkLiked()
  }, [])

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <span>
            <b>{props?.comment?.user?.name}</b>
          </span>
          <span className={styles.date}>
            {fmDate(Date.parse(props?.comment?.createdAt))}
          </span>
        </div>
        <div className={styles.body}>
          <article>
            {showMore
              ? props?.comment.message
              : props?.comment.message.slice(0, 150)}
          </article>
          {props?.comment.message.length >= 150 && (
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>
        <div className={styles.footer}>
          <IconButton
            size="small"
            aria-label="like"
            onClick={() => {
              if (liked) {
                unlikeComment()
              } else {
                likeComment()
              }
            }}
          >
            {liked ? (
              <Favorite htmlColor="#f91880" />
            ) : (
              <FavoriteBorder htmlColor="#f91880" />
            )}
            <span className={styles.icon__text}>
              {props?.comment?.likes?.length || 0}
            </span>
          </IconButton>
          <IconButton size="small" aria-label="reply">
            <Reply htmlColor="#6c63ff" />
            <span className={styles.icon__text}>
              {childComments.length || 0}
            </span>
          </IconButton>
        </div>
        <ReplyForm
          parentId={props.comment.id}
          postId={props.postId}
          handleSubmit={props.handleSubmitReply}
        />
      </div>
      {childComments.length > 0 && (
        <>
          {!childrenHidden && (
            <div className={styles.nested__comments__stack}>
              <button
                className={styles.collapse__line}
                aria-label="hide__replies"
                onClick={() => setChildrenHidden(!childrenHidden)}
              ></button>
              <div className={styles.nested__comments}>
                {childComments.map((comment: CommentType) => (
                  <Comment
                    refresh={props.refresh}
                    postId={props.postId}
                    key={comment.id}
                    comment={comment}
                    getReplies={props.getReplies}
                    handleSubmitReply={props.handleSubmitReply}
                  />
                ))}
              </div>
            </div>
          )}
          {childrenHidden && (
            <Button
              variant="text"
              color="primary"
              onClick={() => setChildrenHidden(!childrenHidden)}
            >
              show more
            </Button>
          )}
        </>
      )}
    </>
  )
}

export default Comment
