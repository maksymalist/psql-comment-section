const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function seed() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  const kyle = await prisma.user.create({
    data: {
      name: 'Kyle 🤘',
      email: 'kyle@gmail.com',
      password: await bcrypt.hash('123456', 10),
    },
  })

  const sally = await prisma.user.create({
    data: {
      name: 'Sally 😜🤪',
      email: 'sally@gmail.com',
      password: await bcrypt.hash('1234abcd', 10),
    },
  })

  const post1 = await prisma.post.create({
    data: {
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.',
      title: 'Post 1',
      userId: kyle.id,
    },
  })
  const post2 = await prisma.post.create({
    data: {
      body: 'Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.',
      title: 'Post 2',
      userId: sally.id,
    },
  })

  const comment1 = await prisma.comment.create({
    data: {
      message: 'I am a root comment',
      userId: kyle.id,
      postId: post1.id,
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: 'I am a nested comment',
      userId: sally.id,
      postId: post1.id,
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      message: 'I am another root comment',
      userId: sally.id,
      postId: post2.id,
    },
  })

  const comment4 = await prisma.comment.create({
    data: {
      parentId: comment2.id,
      message: 'I am a nested comment 2',
      userId: sally.id,
      postId: post1.id,
    },
  })
}

seed()
