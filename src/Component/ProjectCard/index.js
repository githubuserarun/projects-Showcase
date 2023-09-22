import './index.css'

const ProjectCard = props => {
  const {data} = props
  const {name, imageUrl} = data
  return (
    <li className="cardContainer">
      <img className="cardimg" width="200px" src={imageUrl} alt={name} />
      <p className="para">{name}</p>
    </li>
  )
}
export default ProjectCard
