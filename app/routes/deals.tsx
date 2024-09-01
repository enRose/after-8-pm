import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Form, useLoaderData, useNavigation, useSubmit } from '@remix-run/react'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { getDeals } from '~/data/deals'

export const meta: MetaFunction = () => [{ title: 'After 8pm' }]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const deals = await getDeals(q)
  return json({ deals, q })
}

export default function Deals() {
  const { deals, q } = useLoaderData<typeof loader>()

  const navigation = useNavigation()

  const submit = useSubmit()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const searchField = document.getElementById('q')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ''
    }
  }, [q])

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Form
            id="search-form"
            onChange={event => {
              const isFirstSearch = q === null
              submit(event.currentTarget, {
                replace: !isFirstSearch
              })
            }}
            role="search"
          >
            <Input
              id="q"
              aria-label="Search deals"
              className={
                searching ? 'loading' : '' + ' h-8 w-[150px] lg:w-[250px]'
              }
              defaultValue={q || ''}
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
          </Form>
        </div>

        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
