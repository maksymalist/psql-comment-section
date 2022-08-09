import { client } from '../../../prisma/client'
import jwt from 'jsonwebtoken'

const handler = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    const { postId, message, parentId } = req.body
    const comment = await client.comment.create({
      data: {
        parentId: parentId,
        message: message,
        userId: decoded.id,
        postId: postId,
      },
    })
    res.status(200).json(comment)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
export default handler
