import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from "../redux/store"
import BigContainer from '@/components/BigContainer'
import Firebase from '@/Firebase/firebase'

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Firebase>
      <BigContainer>
        <Component {...pageProps} />
      </BigContainer>
    </Firebase>
  </Provider>
}
