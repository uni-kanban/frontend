import { h, render } from 'preact'
import { Subjects } from 'src/common/subjects'

const url = new URL(location.href)
const subjectId = url.searchParams.get('subject_id')!

const example = {
  'id': '1',
  'subject_id': '2',
  'status': 'opened' as 'opened' | 'submitted' | 'graded',
  'name': 'test subject 2',
  'description': 'send file',
  'deadline': '2024-05-09',
  grade: 1,
}

const res = await fetch('/api/get_tasks.php')

const tasks = (await res.json() as (typeof example)[]).filter((t) =>
  t.subject_id === subjectId
)

const CreatedTasks = () => {
  return (
    <div>
      <form action='/api/add_task.php' method='POST' class='task'>
        <input name='name' placeholder='' />
        <input type='date' name='deadline' id='deadline' />
        <input name='description' placeholder='description' />
        <input name='status' value='opened' hidden />
        <input name='subject_id' id='subject_id' hidden value={subjectId} />
        <button type='submit'>Add task</button>
      </form>
      {tasks.filter((t) => t.status === 'opened').map((task) => (
        <div class='task'>
          <h3>{task.name}</h3>
          <div class='desc'>{task.description}</div>
          <time>{task.deadline}</time>
        </div>
      ))}
    </div>
  )
}

const SubmittedTasks = () => {
  return (
    <div>
      {tasks.filter((task) => task.status === 'submitted').map((task) => (
        <form action='/api/grade_task.php' method='POST' class='task'>
          <h3>{task.name}</h3>
          <div class='desc'>{task.description}</div>
          <time>{task.deadline}</time>
          <input type='hidden' name='id' value={task.id} />
          <input
            name='grade'
            min='0'
            max='10'
            type='number'
            required
            placeholder='Put your grade (0-10)'
          />
          <button type='submit'>Submit</button>
        </form>
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

render(<CreatedTasks />, document.getElementById('todo') as HTMLElement)
render(<SubmittedTasks />, document.getElementById('submitted') as HTMLElement)
render(<GradedTasks />, document.getElementById('graded') as HTMLElement)

render(<Subjects />, document.getElementById('subjects') as HTMLElement)
