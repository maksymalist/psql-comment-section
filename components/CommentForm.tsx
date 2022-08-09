import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import {} from '@mui/icons-material'
import styles from '../styles/Comment.module.css'
import axios from 'axios'

type Props = {
  postId: string
  initialValue?: string
  submit: (e: any, text: string, postId: string, reset: any) => void
}

const CommentForm = (props: Props) => {
  const [commentText, setCommentText] = useState(props.initialValue || '')

  const reset = () => {
    setCommentText('')
  }

  return (
    <form
      className={styles.comment__input__form}
      onSubmit={(e) => {
        props.submit(e, commentText, props.postId, reset)
      }}
    >
      <textarea
        autoFocus
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
        className={styles.comment__input}
        placeholder="add a comment..."
        cols={30}
        rows={10}
      />
      <Button
        type="submit"
        className={styles.comment__button}
        variant="contained"
        color="primary"
        size="large"
        disabled={commentText.length <= 0}
      >
        Comment
      </Button>
    </form>
  )
}

export default CommentForm
