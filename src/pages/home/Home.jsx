import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './home.css';

export default function Home() {
    const [userStats, setUserStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            {
                name: 'Jan',
                index: 1,
            },
            {
                name: 'Feb',
                index: 2,
            },
            {
                name: 'Mar',
                index: 3,
            },
            {
                name: 'Apr',
                index: 4,
            },
            {
                name: 'May',
                index: 5,
            },
            {
                name: 'Jun',
                index: 6,
            },
            {
                name: 'Jul',
                index: 7,
            },
            {
                name: 'Agu',
                index: 8,
            },
            {
                name: 'Sep',
                index: 9,
            },
            {
                name: 'Oct',
                index: 10,
            },
            {
                name: 'Nov',
                index: 11,
            },
            {
                name: 'Dec',
                index: 12,
            },
        ],
        [],
    );

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
        const currentUser = user && JSON.parse(user).currentUser;
        if (!currentUser) {
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get('/users/stats');
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], 'Active User': item.total },
                    ]),
                );
            } catch (err) {}
        };
        getStats();
    }, [MONTHS]);

    userStats.sort((a, b) => a.name.index - b.name.index);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
