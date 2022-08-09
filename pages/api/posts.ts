import { client } from '../../prisma/client'

const handler = async (req: any, res: any) => {
  try {
    const posts = await client.post.findMany({
      select: {
        id: true,
        title: true,
        body: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            message: true,
            likes: true,
            postId: true,
            parentId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
export default handler
