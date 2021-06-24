import 'pages/ListAdverts.scss'
import { 
  Advert 
} from 'lib/dataclasses'
import { 
  db
} from 'lib/firebase'
import React from 'react'
import { 
  Link 
} from 'react-router-dom'

export default function ListAdverts() {
  const [adverts, setAdverts] = React.useState([])
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const unsubscribe = db.collection('adverts').onSnapshot(docs => {
      let adverts = []
      docs.forEach(doc => {
        let advert = new Advert(doc.id, doc.data())
        adverts.push(advert)
      })
      setAdverts(adverts)
    }, err => setError(err.message))
    return unsubscribe
  }, [])

  function onDelete(advert) {
    db.collection('adverts').doc(advert.id).delete().then(() => {
      console.log('advert deleted')
    }).catch(err => setError(err.message))
  }
  
  return (
    <div className='listadverts'>
      <h4 className='listadverts__title'>Adverts</h4>
      <Link className='listadverts__create' to='/adverts/create'>Create New Advert</Link>
      {error ? <p className='listadverts__error'>{error}</p> : null}
      {adverts.length === 0 ? (
        <p className='listadverts__callout'>There are no adverts yet.</p>
      ) : (
        <table className='listadverts__table'>
          <thead>
            <tr>
              <th>Post Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adverts.map((advert, i) => (
              <tr key={i}>
                <td>{ advert.created_at_label }</td>
                <td>{ advert.description }</td>
                <td>
                  <Link className='listadverts__action' to={advert.view_url}>View</Link>
                  <Link className='listadverts__action' to={advert.update_url}>Update</Link>
                  <a className='listadverts__action' onClick={e => onDelete(advert)}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}