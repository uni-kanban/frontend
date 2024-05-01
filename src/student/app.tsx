import { h, render } from 'preact'
import { Subjects } from 'src/common/subjects'

const url = new URL(location.href)
const subjectId = url.searchParams.get('subject_id')!

render(<Subjects />, document.getElementById('subjects')!)

const res = await fetch('/api/get_tasks.php')

const example = {
  'id': '1',
  'subject_id': '2',
  'status': 'opened' as 'opened' | 'submitted' | 'graded',
  'name': 'test subject 2',
  'description': 'send file',
  'deadline': '2024-05-09',
  grade: 1,
}

const tasks = (await res.json() as (typeof example)[]).filter((t) =>
  t.subject_id === subjectId
)

const OpenTasks = () => {
  return (
    <div>
      {tasks.filter((t) => t.status === 'opened').map((task) => (
        <form
          action='/api/submit_task.php'
          method='POST'
          class='task'
          enctype='multipart/form-data'
        >
          <h3>{task.name}</h3>
          <div class='desc'>{task.description}</div>
          <time>{task.deadline}</time>
          <input name='assignment_id' hidden value={task.id} />
          <input type='file' name='file' />
          <button type='submit'>Submit</button>
        </form>
      ))}
    </div>
  )
}

const SubmittedTasks = () => {
  return (
    <div>
      {tasks.filter((task) => task.status === 'submitted').map((task) => (
        <div class='task'>
          <h3>{task.name}</h3>
          <div class='desc'>{task.description}</div>
          <time>{task.deadline}</time>
        </div>
      ))}
    </div>
  )
}

const GradedTasks = () => {
    return (
      <div>
        {tasks.filter((task) => task.status === 'graded').map((task) => (
          <div class='task'>
            <h3>{task.name}</h3>
            <div class='desc'>{task.description}</div>
            <time>{task.deadline}</time>
            <div>Grade: {task.grade}</div>
          </div>
        ))}
      </div>
    )
  }

render(<OpenTasks />, document.getElementById('todo') as HTMLElement)
render(<SubmittedTasks />, document.getElementById('submitted') as HTMLElement)
render(<GradedTasks />, document.getElementById('graded') as HTMLElement)
