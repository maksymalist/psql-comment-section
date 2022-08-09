export type CommentType = {
  id: string
  message: string
  createdAt: string
  updatedAt: string
  user: UserType
  userId: string
  post: PostType
  postId: string
  parent: Comment | null
  children: CommentType[]
  parentId: string
  likes: LikeType[]
}
export type PostType = {
  id: string
  title: string
  body: string
  comments: CommentType[]
}

export type UserType = {
  id: string
  name: string
  comments: Comment[]
  likes: LikeType[]
}

export type LikeType = {
  user: UserType
  comment: Comment
  userId: string
  commentId: string
}
