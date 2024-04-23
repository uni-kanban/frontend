import { h, render } from 'preact'
import { Subjects } from 'src/common/subjects'

render(<Subjects />, document.getElementById('subjects')!)

const url = new URL(location.href)

const subjectInput = (document.getElementById('subject_id') as HTMLInputElement)

subjectInput.value = url.searchParams.get('subject') as string