import { WorkoutContext } from "../context/Workoutcontext";
import { useContext } from 'react'

export const useWorkoutContext = () => {
    const con = useContext(WorkoutContext)

    if(!con) {
        throw Error('useWorkoutsContext must be use inside an WorkoutsContextProvider')
    }

    return con
}