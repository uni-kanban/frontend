import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export const Subjects = () => {
  const [subjects, setSubjects] = useState<{name:string}[]>([])

  useEffect(() => {
    fetch('/api/get_subjects.php').then(r => r.json()).then(json => setSubjects(json))
  }, [])

  return <select>
{
  subjects.map(s => <option>{s.name}</option>)
}
  </select>
}