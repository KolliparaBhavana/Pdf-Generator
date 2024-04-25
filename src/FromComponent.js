import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import "bootstrap/dist/css/bootstrap.min.css";
import 'jspdf-autotable';
import './FormComponent.css';

export default function FormComponent (){
  const [inputs,setInputs] =useState({
    username :'',
    course :'Choose a course',
});
 const [formError, setFormError] = useState({})
const handleChange = (e) => {
  const { name, value } = e.target;
  setInputs(prevState => ({
    ...prevState,
    [name]: value,
  }));
};
const validateForm = () => {
 
  let err = {}
  if (inputs.username === '') {
    err.username = 'Username required!'
  }
  if (inputs.course === 'Choose a course') {
    err.course = 'Course selection required!'
  }
  setFormError({ ...err })

  return Object.keys(err).length < 1;
}
const onSubmitHandler = (event) => {
  event.preventDefault()
  console.log("Data:", inputs)
  let isValid = validateForm()

  if (isValid) {
    alert('Details received! You can now download offer letter by clicking on Generate pdf :)')
    
  } else {
    alert('Please fill all fields')
  }
  console.log(isValid)
}
const generatepdf=()=>
{
  console.log("Data:", inputs)
  let isValid = validateForm()
  if (isValid) {
    pdfGenerate();
  } 
}
const date=new Date();
const pdfGenerate=()=>{
  const pdf = new jsPDF();
  if (inputs.course==='B.Tech') {
  pdf.text('Ref-A101',10,10);
  pdf.text('Name: '+inputs.username+'',10,20);
  pdf.text('Course: '+inputs.course+'',10,30);
  pdf.text('Date of Offer: '+date+'',10,40);
  pdf.text('Fee Structure:',10,50);
    const Headers = ['Year','One Time Fee','Tuition Fee'];
    pdf.autoTable({
    head: [Headers],
    body: [
      ['1', '500', '160'],
      ['2', ' ', '160'],
    ],
    margin: { top: 60, left: 10 },
});
  } else {
    pdf.text('Ref-B101',10,10);
  pdf.text('Name: '+inputs.username+'',10,20);
  pdf.text('Course: '+inputs.course+'',10,30);
  pdf.text('Date of Offer: '+date+'',10,40);
  pdf.text('Fee Structure:',10,50);
    const Headers = ['Year','One Time Fee','Tuition Fee'];
    pdf.autoTable({
      head: [Headers],
      body: [
        ['1', '600', '260'],
        ['2', ' ', '260'],
      ],
      margin: { top: 60, left: 10 },
  });
  }
  
  pdf.save("Details.pdf"); 
}
  return(
    <div className='wrapper'>
    <div className="form-box">
    <form onSubmit={onSubmitHandler}>
    <br></br>
    <h3>Profile</h3>
    {/* <label className="form-label">Name:</label><br></br> */}
      <br></br>
      <div>
      <input className="input"type="text" name="username" placeholder="Enter your name" value={inputs.username}onChange={handleChange}/>
      </div>
      &nbsp;&nbsp;<span className='non-valid'>{formError.username}</span><br></br>
      
      
      {/* <br></br><label className="form-label">Course:</label><br></br> */}
      
      <div className="input1">
      <select  name="course" value={inputs.course} onChange={handleChange} placeholder="Choose Course">
              <option>Choose a course</option>
              <option>B.Tech</option>
              <option>M.Tech</option>
      </select>
      </div>
      &nbsp;&nbsp; <span className='non-valid'>{formError.course}</span>
      <br></br>
      
      <Button   type="submit">
        Submit
      </Button>
      &nbsp;&nbsp;
      <Button  onClick={generatepdf}>
      Generate Pdf
      </Button>
      
    </form>
    </div>
    </div>
  )
}