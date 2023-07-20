"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitCommitsAction, unsubmitCommitsAction } from "@/app/actions/submit-commits.action";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Commit } from "@prisma/client";

const submitCommitSchema = z.object({
  description: z.string().optional(),
});

export interface SubmitCommitsFormProps {
  commits: Commit[],
}

export function SubmitCommitsForm({ commits }: SubmitCommitsFormProps) {
  
  const form = useForm({
    resolver: zodResolver(submitCommitSchema),
  });

  const { toast } = useToast();
  
  async function submitCommits(data: z.infer<typeof submitCommitSchema>) {
    try {
      await submitCommitsAction({
        description: data.description || null,
        commitIds: commits.map(commit => commit.id),
      });
  
      toast({
        description: "Commits submitted!",
      });
    } catch (err: any) {
      toast({
        title: "There was a problem with your submit request.",
        description: err.message ?? "Unknown error",
        action: (
          <ToastAction
            altText="try-again"
            onClick={() => submitCommits(data)}
          >
            Try Again
          </ToastAction>
        ),
      });
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
                <span className="opacity-80 leading-relaxed">
                  Description
                </span>

                <small className="text-xs opacity-20">
                  optional
                </small>
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
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>

          {process.env.NODE_ENV === 'development' && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => unsubmitCommitsAction()}
            >
              Unsubmitt all (DEBUG)
            </Button>
          )}
        </footer>
      </form>
    </Form>
  )
}
