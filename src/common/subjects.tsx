import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export const Subjects = () => {
  const [subjects, setSubjects] = useState<{ name: string; id: string }[]>([])

  useEffect(() => {
    fetch('/api/get_subjects.php').then((r) => r.json()).then((json) =>
      setSubjects(json)
    )
  }, [])

  return (
    <select name="subject">
      {subjects.map((s) => <option value={s.id}>{s.name}</option>)}
    </select>
  )
}
