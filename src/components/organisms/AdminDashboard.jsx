import React, { useState } from 'react';
import { 
FaTachometerAlt, FaClipboardList, FaBoxes, FaTags, FaUsers, FaChartBar,FaUser,FaStore,FaSignOutAlt,FaSyncAlt,FaDownload,FaShoppingCart,FaBox,FaUserFriends} from 'react-icons/fa';
import './AdminDashboard.css';

export default function AdminDashboard(){
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const overviewData =[
        {
            id: 1,
            title:'Compras',
            value: '2,459',
            footer : 'Probabilidad de aumento del 10%',
            ico:FaShoppingCart,
            trend: 'positive'

        },
        {
            id: 2,
            title:'Producto',
            value: '500',
            footer : 'Invebtario actual de productos : 750',
            ico:FaBox,
            trend: 'neutal'

        }
    ]
}