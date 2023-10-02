import { useWorkoutContext } from "../hooks/useWorkoutContext"
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const { dispatch} = useWorkoutContext()

    const handleClick = async () => {
     const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE'
     })
     const json = await response.json()

     if(response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
     }
    }

    return (
        <div className="workoutdetails" >
            <h3>{workout.title}</h3>
            <p><strong>Load (kg): </strong>{workout.loads}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix : true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails