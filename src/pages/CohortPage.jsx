import { useState } from "react"
import { useParams } from "react-router-dom"
import cohortService from "./../services/cohort.services";

const CohortPage = () => {
 const [cohort, setCohort] = useState({})

 const {cohortId} = useParams()

//  const getCohortById = () => {
//     cohortService.getCohort(cohortId)
//     .then((responce) => {
//         setCohort()
//     })
    
//  }

    return (
        <div className="CohortPage">ONE cohort</div>
    )
}

export default CohortPage