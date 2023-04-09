import { useParams } from 'react-router-dom';
import PostFormLayout from '../layouts/PostFormLayout'

const EditPost = () => {
  const { id } = useParams();
  return (
    <PostFormLayout id={id} />
  )
}

export default EditPost
