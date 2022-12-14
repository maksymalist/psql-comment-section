import { client } from '../../../prisma/client'
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'

const handler = async (req: any, res: any) => {
  try {
    const { email, password, name } = req.body
    const user = await client.user.create({
      data: {
        email: email,
        password: bycrypt.hashSync(password, 10),
        name: name,
      },
    })
    console.log(user)
    if (!user) {
      res.status(401).json({
        error: 'Error creating user',
      })
      return
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 60 * 60 * 24 * 3, // 3 days
    })
    res.status(200).json({
      token,
    })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
export default handler
