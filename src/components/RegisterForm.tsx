'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRegistration } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

//  Schema 
const registerSchema = z.object({
  attendeeName: z.string().min(2, 'Name must be at least 2 characters'),
  attendeeEmail: z.string().email('Please enter a valid email address'),
  talkId: z.number(),
})

type RegisterFormData = z.infer<typeof registerSchema>

//  Component 
interface RegisterFormProps {
  talkId: number
}

export default function RegisterForm({ talkId }: RegisterFormProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { talkId },
  })

  const mutation = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talks'] })
      reset()
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    mutation.reset()          // clear previous error/success before new attempt
    mutation.mutate(data)
  }

  const isPending = isSubmitting || mutation.isPending

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl border bg-card p-6 flex flex-col gap-5 max-w-md"
    >
      <h2 className="text-lg font-semibold">Register for this talk</h2>

      {/* Hidden talkId — registered via RHF so Zod validates it */}
      <input type="hidden" {...register('talkId', { valueAsNumber: true })} />

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="attendeeName">Your name</Label>
        <Input
          id="attendeeName"
          placeholder="Dintle Mili"
          aria-invalid={!!errors.attendeeName}
          {...register('attendeeName')}
        />
        {errors.attendeeName && (
          <p className="text-sm text-red-600">{errors.attendeeName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="attendeeEmail">Email address</Label>
        <Input
          id="attendeeEmail"
          type="email"
          placeholder="dee@example.com"
          aria-invalid={!!errors.attendeeEmail}
          {...register('attendeeEmail')}
        />
        {errors.attendeeEmail && (
          <p className="text-sm text-red-600">{errors.attendeeEmail.message}</p>
        )}
      </div>

      {/* Mutation error banner */}
      {mutation.isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <strong className="font-semibold">Registration failed: </strong>
          {mutation.error instanceof Error
            ? mutation.error.message
            : 'An unexpected error occurred.'}
        </div>
      )}

      {/* Success banner */}
      {mutation.isSuccess && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <strong className="font-semibold">You're registered!</strong> See you at the talk.
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Registering…' : 'Register'}
      </Button>
    </form>
  )
}
