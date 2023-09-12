import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from "../redux/store"
import BigContainer from '@/components/BigContainer'

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <BigContainer>
      <Component {...pageProps} />
    </BigContainer>
  </Provider>
}
