import uniqid from 'uniqid'
import { projects } from '../../portfolio'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Highlighted Projects</h2>
      <h6 className='section__subtitle'> These are the projects {" I'd "} like to highlight, but you can always check out my github. </h6>

      <div className='projects__grid'>
        {projects.map((project) => (
          <ProjectContainer key={uniqid()} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
