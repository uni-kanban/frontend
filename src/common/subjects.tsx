import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

const url = new URL(location.href)

export const Subjects = () => {
  const [subjects, setSubjects] = useState<{ name: string; id: string }[]>([])

  useEffect(() => {
    fetch('/api/get_subjects.php').then((r) => r.json()).then((json) =>
      setSubjects(json)
    )
  }, [])

  return (
    <select
      name='subject_id'
      onChange={(e) => {
        url.searchParams.set('subject_id', e.currentTarget.value)
        location.search = url.search
      }}
    >
      {subjects.map((s) => (
        <option
          selected={url.searchParams.get('subject_id') === s.id}
          value={s.id}
        >
          {s.name}
        </option>
      ))}
    </select>
  )
}
