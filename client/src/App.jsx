
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.context'
import { SetupProfileProvider } from './features/profile/completeProfile.context'

function App() {

  return (
    <AuthProvider>
      <SetupProfileProvider>
        <AppRoutes/>
      </SetupProfileProvider>
    </AuthProvider>
  )
}

export default App
