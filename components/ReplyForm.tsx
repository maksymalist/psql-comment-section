import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import {} from '@mui/icons-material'
import styles from '../styles/Comment.module.css'

type Props = {
  handleSubmit: (
    e: any,
    text: string,
    postId: string,
    parentId: string,
    reset: any
  ) => void
  postId: string
  parentId: string
  initialValue?: string
}

const ReplyForm = (props: Props) => {
  const [replyText, setreplyText] = useState(props.initialValue || '')
  const reset = () => {
    setreplyText('')
  }

  return (
    <form
      className={styles.reply__input__form}
      onSubmit={(e) =>
        props.handleSubmit(e, replyText, props.postId, props.parentId, reset)
      }
    >
      <input
        onChange={(e) => setreplyText(e.target.value)}
        value={replyText}
        placeholder="reply..."
        className={styles.reply__input}
      />
      <button
        type="submit"
        disabled={replyText.length <= 0}
        className={styles.reply__button}
      >
        reply
      </button>
    </form>
  )
}

export default ReplyForm
