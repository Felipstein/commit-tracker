'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  exportCommitsToJson,
  submitCommitsAction,
  unsubmitCommitsAction,
} from '@/app/actions/submit-commits.action'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { useCommitsStore } from '@/stores/CommitsStore'
import { InputTag } from '@/components/common/InputTag'

const submitCommitSchema = z.object({
  tags: z.array(z.string()).min(1, { message: 'Add at least one tag.' }),
  description: z.string().optional(),
})

type SubmitCommitsFormData = z.infer<typeof submitCommitSchema>

export interface SubmitCommitsFormProps {
  unsubmittedCommitsSelected: CommitWithSubmitInfo[]
}

export function SubmitCommitsForm({
  unsubmittedCommitsSelected,
}: SubmitCommitsFormProps) {
  // const [files, setFiles] = useState<File[]>([])

  const form = useForm<SubmitCommitsFormData>({
    resolver: zodResolver(submitCommitSchema),
    defaultValues: {
      tags: [],
    },
  })

  const { toast } = useToast()

  // function onSelectImages(event: ChangeEvent<HTMLInputElement>) {
  //   const { files } = event.target

  //   if (!files) {
  //     return
  //   }

  //   const filesFixed: File[] = []

  //   for (let i = 0; i < files.length; i++) {
  //     filesFixed.push(files[i])
  //   }

  //   setFiles((prevState) => [...prevState, ...filesFixed])
  // }

  // function onRemoveImage(file: File) {
  //   setFiles((prevState) => prevState.filter((fileObj) => fileObj !== file))
  // }

  async function submitCommits(data: SubmitCommitsFormData) {
    try {
      const commitIds = unsubmittedCommitsSelected.map((commit) => commit.id)

      const commits = await submitCommitsAction({
        tags: data.tags,
        description: data.description || null,
        commitIds,
        imageUrls: [],
      })

      toast({
        description: 'Commits submitted!',
      })

      form.setValue('tags', [])
      form.setValue('description', '')

      useCommitsStore.setState({
        commits,
        commitIdsSelected: commits
          .filter((commit) => !commit.submitInfo)
          .map((commit) => commit.id),
      })
    } catch (err: any) {
      toast({
        title: 'There was a problem with your submit request.',
        description: err.message ?? 'Unknown error',
        action: (
          <ToastAction altText="try-again" onClick={() => submitCommits(data)}>
            Try Again
          </ToastAction>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        // onSubmit={form.handleSubmit(submitCommits)}
        noValidate
        className="space-y-8 w-96"
      >
        <FormField
          name="description"
          render={({ field }) => (
            <>
              {/* <label
                htmlFor="images"
                className="relative flex flex-col gap-2 cursor-pointer"
              >
                <input
                  id="images"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={onSelectImages}
                />

                <div className="flex items-center gap-2">
                  <span className="opacity-80 leading-relaxed">Upload</span>

                  <small className="text-xs opacity-20">optional</small>

                  {files.length > 0 && (
                    <span className="absolute right-0 flex items-center gap-0.5 text-sm opacity-70 hover:opacity-90 hover:underline">
                      Upload more
                      <PlusIcon className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    'w-full h-44 flex items-center gap-1 justify-center rounded-md bg-zinc-100/40 border-zinc-200 dark:bg-zinc-900/20 border dark:border-zinc-900',
                    {
                      'w-fit': files.length > 0,
                    },
                  )}
                >
                  {files.length === 0 && (
                    <span className="text-xs opacity-30">
                      Upload images to provide examples or detail your commits
                    </span>
                  )}

                  {files.length > 0 && (
                    <ul className="flex gap-1 h-full">
                      {files
                        .map((file) => ({
                          file,
                          preview: URL.createObjectURL(file),
                        }))
                        .map(({ file, preview }) => (
                          <li key={preview} className="relative group">
                            <Image
                              src={preview}
                              alt="Image Preview"
                              width={200}
                              height={200}
                              className="w-24 h-full object-cover"
                            />

                            <button
                              type="button"
                              className="absolute hidden group-hover:flex items-center justify-center bg-red-700 hover:bg-red-500 p-0.5 rounded-full top-1 right-1"
                              onClick={(event) => {
                                event.preventDefault()
                                onRemoveImage(file)
                              }}
                            >
                              <X className="w-3 h-3 text-zinc-50" />
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label> */}

              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span className="opacity-80 leading-relaxed">Tags</span>

                  <small className="text-xs opacity-20">
                    require at least one
                  </small>
                </FormLabel>

                <FormControl>
                  <InputTag />
                </FormControl>

                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span className="opacity-80 leading-relaxed">
                    Description
                  </span>

                  <small className="text-xs opacity-20">optional</small>
                </FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="Put here a description for your commits"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <footer className="flex items-center gap-3">
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting}
            disabled={
              !form.formState.isValid || unsubmittedCommitsSelected.length === 0
            }
          >
            Submit
          </Button>

          {process.env.NODE_ENV === 'development' && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => exportCommitsToJson()}
              >
                Export all (DEBUG)
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={async () => {
                  const commits = await unsubmitCommitsAction()
                  useCommitsStore.setState({
                    commits,
                    commitIdsSelected: commits.map((commit) => commit.id),
                  })
                }}
              >
                Unsubmitt all (DEBUG)
              </Button>
            </>
          )}
        </footer>
      </form>
    </Form>
  )
}
