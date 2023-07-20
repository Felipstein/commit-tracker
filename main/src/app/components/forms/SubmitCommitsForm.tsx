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
import { useEffect, useRef } from 'react'

const submitCommitSchema = z.object({
  description: z.string().optional(),
})

type SubmitCommitsFormData = z.infer<typeof submitCommitSchema>

export interface SubmitCommitsFormProps {
  unsubmittedCommitsSelected: CommitWithSubmitInfo[]
}

export function SubmitCommitsForm({
  unsubmittedCommitsSelected,
}: SubmitCommitsFormProps) {
  const awaitCommitsListUpdate = useRef(false)

  const commits = useCommitsStore((s) => s.commits)
  const clearSelectCommitIds = useCommitsStore((s) => s.clearSelectCommitIds)

  const form = useForm<SubmitCommitsFormData>({
    resolver: zodResolver(submitCommitSchema),
  })

  const { toast } = useToast()

  useEffect(() => {
    if (awaitCommitsListUpdate.current) {
      awaitCommitsListUpdate.current = false

      clearSelectCommitIds()
    }
  }, [commits, clearSelectCommitIds])

  async function submitCommits(data: SubmitCommitsFormData) {
    try {
      await submitCommitsAction({
        description: data.description || null,
        commitIds: unsubmittedCommitsSelected.map((commit) => commit.id),
      })

      toast({
        description: 'Commits submitted!',
      })

      form.setValue('description', '')
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
        onSubmit={form.handleSubmit(submitCommits)}
        noValidate
        className="space-y-8 w-96"
      >
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <span className="opacity-80 leading-relaxed">Description</span>

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
                onClick={() => unsubmitCommitsAction()}
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
