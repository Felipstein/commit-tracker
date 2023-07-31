import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { prisma } from './prisma'

export default class CommitsRepository {
  getAll(by: 'database' | 'mocked' = 'database') {
    return by === 'database'
      ? this.getCommitsOfDatabase()
      : this.getMockedCommits()
  }

  private async getMockedCommits() {
    const commits = await prisma.commit.findMany({
      include: { submitInfo: true },
      orderBy: { committedAt: 'desc' },
    })

    return commits as CommitWithSubmitInfo[]
  }

  private async getCommitsOfDatabase() {
    // const commitsInJson = await import('../../tmp/commits.json')

    // const commits = commitsInJson.sort(
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   (a, b) => new Date(b.committedAt) - new Date(a.committedAt),
    // ) as unknown

    // return commits as CommitWithSubmitInfo[]
    return []
  }
}

const commitsRepo = new CommitsRepository()

export { commitsRepo }
