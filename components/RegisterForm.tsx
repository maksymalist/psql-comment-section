import { useState } from 'react'
import axios from 'axios'
import { Button, TextField, InputAdornment } from '@mui/material'
import styles from '../styles/Login.module.css'
import {
  AssignmentIndOutlined,
  Key,
  AlternateEmail,
  SentimentSatisfied,
} from '@mui/icons-material'
import Link from 'next/link'
import { setCookie } from 'cookies-next'
type Props = {}

const LoginForm = (props: Props) => {
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }
  const handleRegister = async (e: any) => {
    e.preventDefault()
    if (e.target.password.value !== e.target.confirmPassword.value) {
      alert('Passwords do not match')
      return
    } else if (!validateEmail(e.target.email.value)) {
      alert('Invalid email')
      return
    }

    try {
      const user = await axios.post('http://localhost:3000/api/auth/register', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      setCookie('user-token', user.data.token, {
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
      })
      window.location.href = '/'
    } catch (error) {
      alert(error)
    }
  }

  return (
    <form className={styles.card} onSubmit={handleRegister}>
      <h2 className={styles.header}>
        <span style={{ marginRight: '10px' }}>Register</span>{' '}
        <AssignmentIndOutlined />
      </h2>

      <TextField
        label="Username"
        required
        name="name"
        className={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SentimentSatisfied style={{ color: 'c4c4c4', opacity: '90%' }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Email"
        name="email"
        required
        className={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmail style={{ color: 'c4c4c4', opacity: '90%' }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        required
        label="Password"
        name="password"
        type="password"
        className={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key style={{ color: 'c4c4c4', opacity: '90%' }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        className={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key style={{ color: 'c4c4c4', opacity: '90%' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        className={styles.button}
      >
        Register
      </Button>
      <Link href="/login">
        <a>...or login</a>
      </Link>
    </form>
  )
}

export default LoginForm
