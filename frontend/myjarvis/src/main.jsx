//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import './styles/default.css'; // Tailwind + 커스텀 스타일
import { BrowserRouter } from 'react-router-dom';


//컴포넌트 외부에서, 컴포넌트 전환을 위해 History 사용으로 변경
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { customHistory } from './component/common/history.js';

createRoot(document.getElementById('root')).render(
<HistoryRouter history={customHistory}>
    <App />
</HistoryRouter>
)
