import { revalidatePath } from 'next/cache'

export async function revalidateCommits() {
  revalidatePath('/')
}
