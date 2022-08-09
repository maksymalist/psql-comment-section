import { useState } from 'react'
import axios from 'axios'
import { Button, TextField, InputAdornment } from '@mui/material'
import styles from '../styles/Login.module.css'
import { AssignmentIndOutlined, AlternateEmail, Key } from '@mui/icons-material'
import Link from 'next/link'
import { setCookie, getCookie } from 'cookies-next'

type Props = {}

const LoginForm = (props: Props) => {
  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const user = await axios.post('http://localhost:3000/api/auth/login', {
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
    <form className={styles.card} onSubmit={handleLogin}>
      <h2 className={styles.header}>
        <span style={{ marginRight: '10px' }}>Login</span>{' '}
        <AssignmentIndOutlined />
      </h2>
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
        Login
      </Button>
      <Link href="/register">
        <a>...or register</a>
      </Link>
    </form>
  )
}

export default LoginForm
