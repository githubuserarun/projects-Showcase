import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProjectCard from '../ProjectCard'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const statusConstant = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Projects extends Component {
  state = {key: 'ALL', data: [], status: statusConstant.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: statusConstant.process})
    const {key} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${key}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const projectData = data.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({data: projectData, status: statusConstant.success})
    } else {
      this.setState({status: statusConstant.failure})
    }
  }

  onChangeValue = async event => {
    await this.setState({key: event.target.value})
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  onProcess = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onSuccess = () => {
    const {data} = this.state
    return (
      <ul>
        {data.map(each => (
          <ProjectCard key={each.id} data={each} />
        ))}
      </ul>
    )
  }

  onFailure = () => (
    <div className="FailureContainer">
      <img
        width="600px"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="FailureButton"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  rendering = () => {
    const {status} = this.state

    switch (status) {
      case statusConstant.process:
        return this.onProcess()
      case statusConstant.success:
        return this.onSuccess()
      case statusConstant.failure:
        return this.onFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="SelectElement">
          <select onChange={this.onChangeValue}>
            {categoriesList.map(each => (
              <option value={each.id}>{each.displayText}</option>
            ))}
          </select>
        </div>
        <div className="displayContainer">{this.rendering()}</div>
      </div>
    )
  }
}
export default Projects
