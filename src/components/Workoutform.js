import {useState} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'



const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext()

    
    const [title, setTitle] = useState('')
    const [ loads, setLoads] = useState('')
    const [ reps, setReps] = useState('')
    const [ error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title,reps,loads}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle('')
            setError(null)
            setLoads('')
            setReps('')
            setEmptyFields([])
            dispatch({type : 'CREATE_WORKOUT', payload: json})
        }
    
    }
  //after load shedding
  //repeat the className for each one.
    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Excersize Title:</label>
            
            <input type='text'onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''} />

            <label>Load (in kg): </label>
             <input type='number'onChange={(e) => setLoads(e.target.value)} value={loads} className={emptyFields.includes('loads') ? 'error' : ''}/>

             <label>Number of Reps</label>
              <input type='number'onChange={(e) => setReps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''} />


              <button>Add Workout</button>
              {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm