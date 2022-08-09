import { client } from '../../../prisma/client'
import jwt from 'jsonwebtoken'

const handler = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    const { commentId } = req.body
    const like = await client.like.delete({
      where: {
        userId_commentId: {
          userId: decoded.id,
          commentId: commentId,
        },
      },
    })
    res.status(200).json(like)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
export default handler
