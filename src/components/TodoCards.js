import React, { useState } from 'react'
import './css/TodoCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight, faCheck, faFileCircleCheck, faTrash } from '@fortawesome/free-solid-svg-icons'


function TodoCards({ date, text, description, handleDelete,index}) {
  const [show, setShow] = useState(false)
  const [height, setHeight] = useState(45)

  

  return (
    <>
      <div className="cardBody"
        style={{ height: height, transition: "all 0.5s ease" }}>
        <div className="d-flex justify-content-between">
          <span className="cardText">
            <span className="dropDownArrow mx-2">
              {show ?
                <FontAwesomeIcon size="xl" icon={faCaretDown} onClick={() => { setHeight(45); setShow(!show) }} data-toggle="tooltip" title="Show less" />
                :
                <FontAwesomeIcon size="xl" icon={faCaretRight} onClick={() => { setHeight(160); setShow(!show) }} data-toggle="tooltip" title="Show more" />
              }
            </span>
            <strong> Text:</strong> {text}
          </span>
          <span className="controls">
            {/* <FontAwesomeIcon className='btnOption done mx-1 p-1 px-3 ' icon={faFileCircleCheck}  size="l"/> */}
            <FontAwesomeIcon className=' delete mx-1 p-1 px-3 ' icon={faTrash} size="l" onClick={(e) => handleDelete(e,index)} />
          </span>
        </div>
        <hr />
        <span className="cardDate">
          <strong> Date: </strong>{date}
        </span>
        <div className="description mb-3">
          <strong> Desc: </strong>{description}
        </div>
      </div >
    </>
  )
}

export default TodoCards
// {show ? "card-selected" : "cardBody"} 