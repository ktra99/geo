import { prisma } from '@src/utils/prisma'
import type { Score } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score | Score[] | string>
) {
  if(req.method === "GET"){
    const scores = await prisma.score.findMany({
      orderBy: {
        score: "desc"
      },
      take: 5
    })
    return res.status(200).json(scores)
  }
  else if(req.method === "POST"){
    const score = await prisma.score.create({
      data: req.body
    })
    return res.status(200).json(score)
  }
  else{
    return res.status(501).send("request method is not supported")
  }
}
