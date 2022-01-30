import { contact } from '../../portfolio'
import './Contact.css'

const Contact = () => {
  if (!contact.email) return null

  return (
    <section className='section contact center' id='contact'>
      <h2 className='section__title'>Contact</h2>
      <a href="#open-contact">
        <span type='button' className='btn btn--outline'>
          Contact me
        </span>
      </a>
    </section>
  )
}

export default Contact
