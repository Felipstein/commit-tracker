import { CommitsList } from '@/components/commits/CommitsList'
import { prisma } from '@/lib/prisma'
import { CollaboratorsList } from './components/CollaboratorsList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SubmitCommits } from './components/SubmitCommits'
import { Commit } from '@prisma/client'

export default async function HomePage() {
  // const commits = await prisma.commit.findMany();
  const commits: Commit[] = [
    {
      id: 'clk7ftcg40000jx06v5939o9r',
      hash: 'e75089a214d5c56737e07bcfaa666180686c69f6',
      message: 'feat: add to schema (on main app) redirect url',
      authorName: 'Felipstein',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:28:39.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/e75089a214d5c56737e07bcfaa666180686c69f6',
      commitsSubmitId: null,
    },
    {
      id: 'abababab',
      hash: 'a48a1f0f0c352c55524bcf05df57be21ec012363',
      message: 'fix: get date from string',
      authorName: 'matheuzinoficial',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:32:29.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/a48a1f0f0c352c55524bcf05df57be21ec012363',
      commitsSubmitId: null,
    },
    {
      id: 'sdsdsdsds',
      hash: '3539b0edf3919f12df270fe47233597fc6a5ba12',
      message: 'docs: add missing todo',
      authorName: 'Yanzaum',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:32:50.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/3539b0edf3919f12df270fe47233597fc6a5ba12',
      commitsSubmitId: null,
    },
    {
      id: 'aawdwadawda',
      hash: 'da2e512b6a274c367d6d442cdb4ee29a421e91c2',
      message: '🌈 style: apply dark theme',
      authorName: 'lucafrederice',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T00:25:27.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/da2e512b6a274c367d6d442cdb4ee29a421e91c2',
      commitsSubmitId: null,
    },
    {
      id: 'dwadawgeagtretgergereh',
      hash: '032365222fb9004a6d2fa6ba6d76dbd32e176f3f',
      message: 'chore: add some libs',
      authorName: 'daltonmenezes',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T00:25:42.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/032365222fb9004a6d2fa6ba6d76dbd32e176f3f',
      commitsSubmitId: null,
    },
    {
      id: 'dawdvxdfgrdgr',
      hash: '725a02ee8d73b8da6d7226f87cea532a693f65a7',
      message: '✨ feat: add collaborators list',
      authorName: 'cleitonsouza',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T01:36:12.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/725a02ee8d73b8da6d7226f87cea532a693f65a7',
      commitsSubmitId: null,
    },
    {
      id: 'dawdfgsgrsdgrgrd',
      hash: 'e75089a214d5c56737e07bcfaa666180686c69f6',
      message: 'feat: add to schema (on main app) redirect url',
      authorName: 'Felipstein',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:28:39.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/e75089a214d5c56737e07bcfaa666180686c69f6',
      commitsSubmitId: null,
    },
    {
      id: 'atreytrehy',
      hash: 'a48a1f0f0c352c55524bcf05df57be21ec012363',
      message: 'fix: get date from string',
      authorName: 'matheuzinoficial',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:32:29.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/a48a1f0f0c352c55524bcf05df57be21ec012363',
      commitsSubmitId: null,
    },
    {
      id: 'ggdhnfhfthtrf',
      hash: '3539b0edf3919f12df270fe47233597fc6a5ba12',
      message: 'docs: add missing todo',
      authorName: 'Yanzaum',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:32:50.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/3539b0edf3919f12df270fe47233597fc6a5ba12',
      commitsSubmitId: null,
    },
    {
      id: 'fahftgh',
      hash: 'da2e512b6a274c367d6d442cdb4ee29a421e91c2',
      message: '🌈 style: apply dark theme',
      authorName: 'lucafrederice',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T00:25:27.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/da2e512b6a274c367d6d442cdb4ee29a421e91c2',
      commitsSubmitId: null,
    },
    {
      id: 'abbb',
      hash: '032365222fb9004a6d2fa6ba6d76dbd32e176f3f',
      message: 'chore: add some libs',
      authorName: 'guilhermecapitao',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T00:25:42.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/032365222fb9004a6d2fa6ba6d76dbd32e176f3f',
      commitsSubmitId: null,
    },
    {
      id: 'aaaa',
      hash: '725a02ee8d73b8da6d7226f87cea532a693f65a7',
      message: '✨ feat: add collaborators list',
      authorName: 'Felipstein',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T01:36:12.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/725a02ee8d73b8da6d7226f87cea532a693f65a7',
      commitsSubmitId: null,
    },
    {
      id: 'dwadawdawdawdawdwa',
      hash: 'e75089a214d5c56737e07bcfaa666180686c69f6',
      message: 'feat: add to schema (on main app) redirect url',
      authorName: 'maateusilva',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:28:39.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/e75089a214d5c56737e07bcfaa666180686c69f6',
      commitsSubmitId: null,
    },
    {
      id: 'dwadwafawfaw',
      hash: 'a48a1f0f0c352c55524bcf05df57be21ec012363',
      message: 'fix: get date from string',
      authorName: 'matheuzinoficial',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:32:29.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/a48a1f0f0c352c55524bcf05df57be21ec012363',
      commitsSubmitId: null,
    },
    {
      id: 'bdfbdb',
      hash: '3539b0edf3919f12df270fe47233597fc6a5ba12',
      message: 'docs: add missing todo',
      authorName: 'Yanzaum',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-17T22:32:50.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/3539b0edf3919f12df270fe47233597fc6a5ba12',
      commitsSubmitId: null,
    },
    {
      id: 'gawgwa',
      hash: 'da2e512b6a274c367d6d442cdb4ee29a421e91c2',
      message: '🌈 style: apply dark theme',
      authorName: 'diego3g',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T00:25:27.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/da2e512b6a274c367d6d442cdb4ee29a421e91c2',
      commitsSubmitId: null,
    },
    {
      id: 'dwa',
      hash: '032365222fb9004a6d2fa6ba6d76dbd32e176f3f',
      message: 'chore: add some libs',
      authorName: 'Matan18',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T00:25:42.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/032365222fb9004a6d2fa6ba6d76dbd32e176f3f',
      commitsSubmitId: null,
    },
    {
      id: 'a',
      hash: '725a02ee8d73b8da6d7226f87cea532a693f65a7',
      message: '✨ feat: add collaborators list',
      authorName: 'MateusHoffman',
      authorEmail: 'luisfelipe-oliveira@outlook.com.br',
      committedAt: new Date('2023-07-19T01:36:12.000Z'),
      redirectUrl:
        'https://github.com/Felipstein/commit-tracker/commit/725a02ee8d73b8da6d7226f87cea532a693f65a7',
      commitsSubmitId: null,
    },
  ]

  const users = Array.from(new Set(commits.map((commit) => commit.authorName)))

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-12">
        <header className="flex items-center justify-between gap-4">
          <CollaboratorsList usernames={users} />
        </header>

        <main className="relative m-auto flex w-fit items-start gap-20">
          {/* Left Content */}
          <ScrollArea className="h-[70vh] w-full">
            <CommitsList commits={commits} />
          </ScrollArea>

          {/* Right Content */}
          <SubmitCommits
            totalCommits={commits.length}
          />
        </main>
      </div>
    </div>
  )
}
