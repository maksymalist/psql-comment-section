import { client } from '../../../prisma/client'
import jwt from 'jsonwebtoken'

const handler = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    const { commentId } = req.body
    const liked = await client.like.findFirst({
      where: {
        userId: decoded.id,
        commentId: commentId,
      },
    })

    if (liked !== null) {
      res.status(200).json({
        liked: true,
      })
      return
    } else {
      res.status(200).json({
        liked: false,
      })

      return
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({
      liked: false,
    })
  }
}
export default handler
