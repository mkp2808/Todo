import { faCalendarDays, faP, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import './css/Home.css'
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker from 'react-datepicker'
import TodoCards from './TodoCards'
import moment from 'moment/moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

function Home() {

    const [inpTodo, setInpTodo] = useState("")
    const [inpDate, setInpDate] = useState()
    const [inpTodoDes, setInpTodoDes] = useState("")

    const [data, setData] = useState([])
    const fetchData = () => {
        if (localStorage.getItem("todo")) {
            setData(JSON.parse(localStorage.getItem("todo")));
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inpTodo !== "" && inpDate !== "" && inpTodoDes !== "") {
            if (localStorage.getItem("todo")) {
                let data = JSON.parse(localStorage.getItem("todo"));

                data.push({ "text": inpTodo, "date": moment(inpDate).format('DD-MM-YYYY'), "description": inpTodoDes })

                localStorage.setItem("todo", JSON.stringify(data))
            }
            else {
                localStorage.setItem("todo", JSON.stringify([{ "text": inpTodo, "date": moment(inpDate).format('DD-MM-YYYY'), "description": inpTodoDes }]))
            }
            toast.success('Todo entered Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            toast.error('Please enter all fields..!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        fetchData()
    }

    const handleDelete = (e, index) => {
        localStorage.removeItem("todo");
        const newData = data.filter((d, i) => index !== i)
        setData(newData);
        localStorage.setItem("todo", JSON.stringify(newData))
    }

    const inputDate = useRef();
    const DateIconClick = () => {
        inputDate.current.handleFocus()
    }

    return (
        <div className="container d-flex justify-content-center ">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="todo-list  ">
                <form action="#" className='AddForm mb-2' >
                    <div className="d-flex justify-content-between">
                        <input type="text" className=' Todoinp AddTodoText' onChange={(e) => setInpTodo(e.target.value)} placeholder='New Todo' name="AddTodo" />
                        {/* <input type="date" className=' Todoinp dateInp' id='date-input' /> */}
                        <span className='d-flex '>
                            <ReactDatePicker
                                ref={inputDate}
                                placeholderText='Date' className=' Todoinp dateInp'
                                selected={inpDate}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                onChange={(date) => setInpDate(date)}
                            />
                            <FontAwesomeIcon className=' DateIcon p-2' onClick={(e) => DateIconClick(e)} icon={faCalendarDays} />

                        </span>
                    </div>
                    <textarea placeholder='Description of TODO' className='Todoinp descInp w-100' onChange={(e) => setInpTodoDes(e.target.value)} name="Desc" id="desc" maxLength="50"></textarea>
                    <div className='d-flex justify-content-end'>
                        {/* <FontAwesomeIcon className='  m-2  AddIcon' onClick={(e) => handleSubmit(e)} icon={faPlus} /> */}
                        <button type="submit"  onClick={(e) => handleSubmit(e)} className='m-2 AddIcon'><FontAwesomeIcon icon={faPlus} /></button>

                    </div>

                </form>
                <div className="cards overflow-auto px-4 py-1">

                    {
                        data.map((data, i) => {
                            return <div key={i}>
                                <TodoCards date={data.date} text={data.text} description={data.description} handleDelete={handleDelete} index={i} />
                            </div>
                        })}
                </div>
            </div>
        </div>
    )
}

export default Home