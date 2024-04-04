import './Rules.css'
import rules from './assets/image-rules.svg'
import close from './assets/icon-close.svg'

export default function Rules(props: {closeRules: any}) {
  return (
    <div className='Rules'>
      <h1>Rules</h1>
      <img src={rules} alt="RULES" />
      <img src={close} alt="CLOSE" onClick={props.closeRules} />
    </div>
  )
}
