import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import cohortService from "../../services/cohort.services";
import { Button, Modal, Table } from "react-bootstrap";


const LabPairing = () => {
    const [students, setStudents] = useState(null);
    const [temporaryPairs, setTemporaryPairs] = useState(null)
    const [temporaryNewStudentsObj, setTemporaryNewStudentsObj] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [text, setText] = useState({value: '', copied: false})

    const {cohortId} = useParams()

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
        setTemporaryPairs(null)
        setTemporaryNewStudentsObj(null)
        setText({value: '', copied: false})
    }

    const getCohort = async () => {
        try {
          const response = await cohortService.getCohort(cohortId);
          setStudents(response.data.students);
        } catch (err) {
          setErrorMessage(err.response.data.message);
        }
      };

    const checkIfPaired = (studentObj, pairId) => {
        if(studentObj._id === pairId){
            return <td key={`${studentObj._id}/${pairId}`} className="bg-dark"></td>
        }
        if(studentObj.pairedWith.includes(pairId)){
            return <td key={`${studentObj._id}/${pairId}`} className="bg-success"></td>
        } else {
            return <td key={`${studentObj._id}/${pairId}`}></td>
        }

    }  

    const prepareTextToCopy = (array) => {
        const longPairsString = array.join("\n")
        console.log(longPairsString)
        setText({...text, value: longPairsString})

    }

    const getRandomStudent = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    const capitalizeString = (string) => {
        return string[0].toUpperCase() + string.slice(1).toLowerCase()
    }

    const findPairsCombination = (array) => {
      const picked = [];
      const pairs = [];

      array.forEach((studentObj) => {
        if (picked.includes(studentObj)) {
          return;
        }
        // esclude current student, all students already paired with, and all already picked
        const filteredPicking = array.filter((el) => {
          return (
            el._id !== studentObj._id &&
            !studentObj.pairedWith.includes(el._id) &&
            !picked.includes(el)
          );
        });

        if(!filteredPicking.length){
            console.log("NO more to pick from");
            return
        }

        // pick a random from filtered
        const willPairWithObj = getRandomStudent(filteredPicking);

        // save match into pairWith array for both students of the 'pair'
        studentObj.pairedWith.push(willPairWithObj._id);
        willPairWithObj.pairedWith.push(studentObj._id);
        // push the updated students objeect into the already picked array
        picked.push(studentObj, willPairWithObj);
        // add pair in pairs result array
        pairs.push(`${capitalizeString(studentObj.studentName)} - ${capitalizeString(willPairWithObj.studentName)}`);
      });
      return { pairs , picked }
    };

    const generateRandomPairs = () => {
        const copy = JSON.parse(JSON.stringify(students));
        const shuffleStudents = [...copy.sort(() => 0.5 - Math. random())]
        let oddStudent 
        let combination = { pairs: [] }

        if(shuffleStudents.length % 2 === 1){
            oddStudent = getRandomStudent(shuffleStudents).studentName
            console.log(oddStudent)
        }

        const minusOdd = shuffleStudents.filter(el => el.studentName !== oddStudent)

        do {
            combination = findPairsCombination(minusOdd)
          } while (combination.pairs.length < (minusOdd.length / 2) && combination.pairs.length > 0);

          console.log("pairs: ", combination.pairs, 'odd', oddStudent)
          console.log("picked", combination.picked)

          if(oddStudent){
            console.log('got odd')
            setTemporaryPairs([...combination.pairs, oddStudent])
            prepareTextToCopy([...combination.pairs, capitalizeString(oddStudent)])
        } else {
            setTemporaryPairs(combination.pairs)
            prepareTextToCopy(combination.pairs)
        }
          setTemporaryNewStudentsObj(combination.picked)
          openModal()
    }



    const submitPairs = async () => {
        try {
            const response = await cohortService.updateStudentsPairs(cohortId, temporaryNewStudentsObj)
            closeModal()
            alert(response.data.message)
            getCohort()
        } catch (err) {
            setErrorMessage(err.response.data.message);
        }
    }


      useEffect(() => {
        getCohort();
      }, [cohortId]);

      if(!students){
        return <h1>Loading</h1>
      }

    return (
      <>
        <Button onClick={generateRandomPairs} className="mb-2" variant="success">
          Get pairs
        </Button>

        {errorMessage && ( <p className="error-message text-uppercase">- {errorMessage} -</p> )}

        {temporaryPairs && (
          <Modal
            show={modalIsOpen}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
              {!text.copied ? 
              <span className="text-danger">Remember to copy end share the pairs!!</span>
              :
              <span className="text-primary">Pairs has been copied. Save now!</span>

              }
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ol>
                {temporaryPairs.map((el, index) => {
                  return (
                    <li key={index} className="text-capitalize">
                      {el}
                    </li>
                  );
                })}
              </ol>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>

                <CopyToClipboard
                    text={text.value}
                    onCopy={() => setText({ copied: true })}
                >
                    <Button variant="primary">Copy to clipboard</Button>
                </CopyToClipboard>

              <Button variant="success" onClick={submitPairs} disabled={!text.copied ? true : false}>
                I like this pairs! Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <Table responsive bordered hover >
          <thead>
            <tr>
              <th></th>
              {students.map((student) => (
                <th key={student._id} className="bg-light">
                  <p className="text-capitalize "> 
                    {/* style={{ transform: "rotate(-90deg)" }}  */}
                    {student.studentName}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="">
                <td className="bg-light position-fixed-start">
                  <b className="text-capitalize">{student.studentName}</b>
                </td>
                {students.map((pair) => checkIfPaired(student, pair._id))}
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
}

export default LabPairing