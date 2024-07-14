import { Community } from '../components/Community'
import { Content } from '../components/Content'
import { Header } from '../components/Header'
import { Rewards } from '../components/Rewards'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="pt-1">
        <Content point={2300} />
        <Community />
        <Rewards />
      </div>
    </div>
  )
}

export default HomePage
