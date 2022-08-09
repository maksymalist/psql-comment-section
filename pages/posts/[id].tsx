import axios from 'axios'
import { useRouter } from 'next/router'
import Post from '../../components/Post'
import type { PostType } from '../../types/post_type'

type Props = {
  post: PostType
}

const post = (props: Props) => {
  return <Post {...props.post} />
}

export default post

export const getStaticPaths = async () => {
  const response = await axios.get('http://localhost:3000/api/posts')
  const paths = response.data.map((post: PostType) => ({
    params: { id: post.id.toString() },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (props: any) => {
  const { id } = props.params
  try {
    const response = await axios.post(`http://localhost:3000/api/post`, { id })
    return {
      props: {
        post: response.data,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        post: { id: 'poop', title: 'poop', body: 'poop', userId: 'poop' },
      },
    }
  }
}
