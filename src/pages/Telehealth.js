import '../App.css';
import Topbar from './topbar';
import Footer from '../footer';
import Practices from '../info/practices';
import Info7 from '../info/info7';
import Practice from './practices';
import { Helmet } from 'react-helmet'; // Import Helmet
import { useContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './Providers/AuthProvider';


export function Telehealth({ t }) {

    const { user } = useContext(AuthContext);
    const { loading, data: paymentsInformation } = useQuery({
        queryKey: ['paymentsInformation'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/payments');
            return res.json();
        }
    })
    if (loading) {
        return <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 20px', fontWeight: "bold", border: 'none', borderRadius: '5px' }}> </button>
    }

    // Find payments for the logged-in user's email
    const paymentsByEmail = paymentsInformation?.find(
        (payment) => (payment?.email === user?.email && payment.status === 'approved')
    );

    return (
        <>
            <Helmet>
                <title>{t('Telehealth Services')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={t("Connect with healthcare providers virtually! Explore our Telehealth Directory to find a doctor offering online consultations. Learn more about the benefits of telehealth.")} />
            </Helmet>

            <header>
                <Topbar />
            </header>
            <div>
                <h1 className='title'>{t('Telehealth Directory')}</h1>
            </div>
            <Practice />
            <div>
                {paymentsByEmail && <Practices />}
            </div>
            <div>
                <Info7 />

            </div>
            <br></br>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
