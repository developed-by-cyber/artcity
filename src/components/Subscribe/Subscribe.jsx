import "./Subscribe.css";
import Swal from 'sweetalert2'
import { useState } from "react";
function Subscribe() {
  const [input,setInput] = useState('')
  function handleInput(e){
   const {value} = e.target
   setInput(value)
  }
  return (
    <>
      <div className="subscribe">
        <div className="left" data-aos="fade-left" data-aos-delay="500">
          <p className="heading">
            Stay in <span>the loop</span>
          </p>
          <p>
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating Artmint.
          </p>
        </div>
        <div className="right" data-aos="fade-right" data-aos-delay="600">
          <form>
            <input onChange={handleInput} type="text" value={input} placeholder="Enter email address" />
            <button onClick={(e)=>{
              e.preventDefault()
              if(!input.includes('@') || !input.includes('.')){
                return Swal.fire({
                  icon:'warning',
                  title:'Opps!',
                  text:'Please enter a valid email'
                })
              }
              Swal.fire({
                icon:'success',
                title:'Great!',
                text:'You have successfully subscribed to our newsletter'
              })
              setInput('')
            }}>Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
