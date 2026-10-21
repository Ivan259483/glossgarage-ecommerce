import { Container } from 'react-bootstrap'

import EmptyState from '../components/EmptyState.jsx'

function NotFound() {
  return (
    <Container className="section-block">
      <EmptyState
        icon="bi-sign-stop"
        title="404 · Page not found"
        message="Looks like you took a wrong turn. The page you're looking for doesn't exist."
        actionLabel="Back to Home"
        actionTo="/"
      />
    </Container>
  )
}

export default NotFound
