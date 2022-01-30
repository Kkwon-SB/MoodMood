import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { IconName } from "react/icons/FaReg"

// import CircularProgress from "@mui/material/CircularProgress";

// const MainChart = () => {
//     return (
//         <>
//             ...main chart loading...
//             <CircularProgress />
//         </>
//     );
// };

// export default MainChart;


const data = [
    {
    name: '\u{1F628}', uv: 'FaRegTired', pv: 2400, count: 3,
    },
    {
    name: '\u{1F62E}', uv: 'FaRegSurprise', pv: 1398, count: 4,
    },
    {
    name: '\u{1F620}', uv: 'FaRegAngry', pv: 9800, count: 6,
    },
    {
    name: '\u{1F61E}', uv: 'FaRegSadTear', pv: 3908, count: 2,
    },
    {
    name: "\u{1F601}", uv: 'FaRegMehBlank', pv: 4800, count: 1,
    },
    {
    name: '\u{1F603}', uv: 'FaRegLaughBeam', pv: 3800, count: 8,
    },
    {
    name: '\u{1F922}', uv: 'FaRegFrown', pv: 4300, count: 3,
    },
];

export default class Example extends PureComponent {

    render() {
    return (
        <BarChart
            width={480}
            height={350}
            data={data}
            barSize={35}
            margin={{
            top: 5,
            right: 30,
            // left: 10,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="count" interval={0} />
            <Tooltip />
            <Bar dataKey="count" fill="#b56dca" />
        </BarChart>
    );
    }
}
